(function (window, $, console, _, angular, Backbone) {
    "use strict";

    var ANIMATION_END = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

    function App() {

        _.extend(this, Backbone.Events);

        this._beaconService = new BeaconService();
        this._api = new Api();
        this._model = new Model();
        this._currentAnswerIds = [];
        this._currentAnswerId = null;
        this._allowAnswer = false;
        this._isOutOfRange = false;

    }

    App.prototype = {
        run: function () {

            console.info("application run");
            var that = this;
            this._registerListeners();
            setTimeout(function () {
                $("#loading-screen-wrapper").hide();
                that._startGame();
            }, 1000);

        },
        _registerListeners: function () {

            //Model listeners
            this.listenTo(this._beaconService, "beacon:found", this._beaconFound);
            this.listenTo(this._beaconService, "beacon:lost", this._beaconLost);
            this.listenTo(this._model, "question:added", this._questionAdded);
            this.listenTo(this._model, "question:removed", this._questionRemoved);
            this.listenTo(this._model, "questions:cleared", this._questionsCleared);
            this.listenTo(this._model, "current_id:changed", this._currentIdChanged);
            this.listenTo(this._model, "score:changed", this._scoreChanged);
            this.listenTo(this._model, "correct:changed", this._correctChanged);
            this.listenTo(this._model, "total:changed", this._totalChanged);

            //DOM listeners
            $(document).on("submit", "#start-new-game", this._onSubmitNewGame.bind(this));
            $(document).on("submit", "#question", this._onSubmitQuestion.bind(this));
            $(document).on("tap", "#left-arrow", this._gotoPrevious.bind(this));
            $(document).on("tap", "#right-arrow", this._gotoNext.bind(this));
            $(document).on("tap", "#end-game", this._onTapEndgame.bind(this));
            $(document).on("tap", "#reload", this._reload.bind(this));

        },
        _reload: function () {
            window.location.reload();
        },
        _onTapEndgame: function () {
            var that = this;
            window.navigator.notification.confirm("Are you sure?", function (i) {
                if (i === 1) {
                    that._endGame();
                }
            }, "End game");
        },
        _endGame: function () {
            $("#end-game").hide();
            this._beaconService.stop();
            $("#question, #beacons-not-found, #start-new-game").hide();
            this._api.endGame(function (board, info) {

                $("#leaderboard").show();
                var lb = $("#leaderboard .list").empty();

                var i = 1;

                var isInTable = false;

                board.forEach(function (e) {
                    var $e = $('<li class="item"></li>');
                    if (i === info.position) {
                        $e.html(i + ". " + info.name + ": " + info.points);
                        $e.css({
                            "font-weight": "bold"
                        });
                        isInTable = true;
                    } else {
                        $e.html(i + ". " + e.name + ": " + e.score);
                    }
                    $e.appendTo(lb);
                    i++;
                });

                if (!isInTable) {
                    $('<li class="item">...</li>').appendTo(lb);
                    var $e = $('<li class="item"></li>');
                    $e.html(info.position + ". " + info.name + ": " + info.points);
                    $e.css({
                        "font-weight": "bold"
                    });
                    $e.appendTo(lb);
                }


            });
        },
        _correctChange: function (c) {
            $("#correct").html(c);
        },
        _totalChanged: function (t) {
            $("#answered").html(t);
        },
        _scoreChanged: function () {
            $("#points").html(this._model.getScore());
        },
        _updateLocation: function () {
            var offset = this._model.getCurrentOffset() + 1;
            var total = this._model.getTotal();
            $("#location").html(offset + "/" + total);
            if (this._isOutOfRange || offset === 0) {
                $("#location").html("Unavailable");
            }
        },
        _currentIdChanged: function () {
            this._updateLocation();
        },
        _gotoPrevious: function () {
            if (this._model.getTotal() !== 0) {
                var id;
                if (this._isOutOfRange) {
                    this._isOutOfRange = false;
                    id = this._model._questions[0].id;
                } else {
                    id = this._model.getPreviousId();
                }
                this._displayQuestion(id);
            }
        },
        _gotoNext: function () {
            if (this._model.getTotal() !== 0) {
                var id;
                if (this._isOutOfRange) {
                    this._isOutOfRange = false;
                    id = this._model._questions[0].id;
                } else {
                    id = this._model.getNextId();
                }
                this._displayQuestion(id);
            }
        },
        _onSubmitQuestion: function (e) {
            e.preventDefault();
            if (!this._allowAnswer) {
                this._gotoNext();
                return true;
            }
            var that = this;
            var data = this._getFormData(e.target);
            var answerId = parseInt(data["current-answer-id"]);
            var questionId = parseInt(data["current-question-id"]);
            if (isNaN(answerId)) {
                $("#answer-error").show();
                return;
            }
            $("#question input, #question button").prop("disabled", true);
            var question = this._model.getQuestionById(questionId);
            this._api.answerQuestion(questionId, answerId, this._currentAnswerIds,
                    function (addedPoints, correctId) {
                        question.isCorrect === addedPoints !== 0;
                        question.isAnswered = true;
                        question.correctAnswerId = correctId;
                        question.answerId = answerId;
                        that._model.incementScore(addedPoints);
                        that._displayQuestion(questionId);
                        that._model.incrementTotal(1);
                        if (question.isCorrect) {
                            that._model.incrementCorrect(1);
                        }
                    });
            return true;
        },
        _beaconFound: function (beacon) {
            $().toastmessage('showSuccessToast', 'found beacon: ' + beacon.original.name);
            var that = this;
            this._api.getQuestions(beacon, function (questions) {
                questions.forEach(function (question) {
                    that._model.addQuestion(question);
                });
            });
        },
        _beaconLost: function (beacon) {
            $().toastmessage('showWarningToast', 'lost beacon: ' + beacon.original.name);
            this._model.removeQuestionsByBeaconUniqueId(beacon.getUniqueId());
        },
        _questionRemoved: function (question) {

            this._checkHasQuestions();
            this._updateLocation();
            var shouldBeLocked = question.id === this._model.getCurrentId() && !question.isAnswered;
            this._isOutOfRange = false;
            if (shouldBeLocked) {
                $("#missing-error").show();
                $("#b-answer").prop("disabled", true);
                $("#location").html("Unavailable");
                this._isOutOfRange = true;
            }

        },
        _questionsCleared: function () {
            this._checkHasQuestions();
            this._updateLocation();
        },
        _questionAdded: function (question) {
            this._checkHasQuestions();
            if (this._model.getCurrentQuestion() === null) {
                this._displayQuestion(question.id);
            }
            this._updateLocation();
            if (question.id === this._model.getCurrentId()) {
                this._displayQuestion(question.id);
            }
        },
        _displayQuestion: function (id) {
            if (id === -1 && this._model._questions.length !== 0) {
                id = this._model._questions[0].id;
            }
            $("#answer-error, #missing-error").hide();
            $("#question input, #question button").prop("disabled", false);
            $("#b-answer").prop("disabled", false);
            this._model.setCurrentId(id);
            var question = this._model.getQuestionById(id);
            var plural = question.pointScale === 1 ? "point" : "points";
            $("#question .question-name").html(question.text);
            $("#point-scale").html("(" + question.pointScale + " " + plural + ")");
            $("#current-question-id").val(id);
            $("#current-answer-id").val("");
            var $answers = $("#question .answers-list").empty();
            var answerIds = [];
            if (question.isAnswered) {
                $("#b-answer").hide();
                $("#b-next").show();
                this._allowAnswer = false;
            } else {
                $("#b-answer").show();
                $("#b-next").hide();
                this._allowAnswer = true;
            }
            question.answers.forEach(function (answer) {
                var $answer = $('<li class="item"><span class="text"></span><i class="fa fa-check current" style="display: none;"></i></li>');
                $answer.find(".text").html(answer.text);
                answerIds.push(answer.id);
                if (!question.isAnswered) {
                    $answer.on("tap", function () {
                        $("#question .fa.current").hide();
                        $("#current-answer-id").val(answer.id);
                        $answer.find(".fa.current").show();
                    });
                } else if (question.isCorrect() && answer.id === question.correctAnswerId) {
                    $answer.find(".current").show();
                    $answer.css({background: "rgba(0, 255, 0, .3)"});
                } else if (!question.isCorrect() && answer.id === question.answerId) {
                    $answer.find(".current").show();
                    $answer.css({background: "rgba(255, 0, 0, .3)"});
                } else if (!question.isCorrect() && answer.id === question.correctAnswerId) {
                    $answer.css({background: "rgba(0, 255, 0, .3)"});
                }
                $answer.appendTo($answers);
            });
            this._currentAnswerIds = answerIds;

        },
        _checkHasQuestions: function () {

            var questionCount = this._model.getQuestionCount();
            var hasQuestions = questionCount !== 0;

            if (!hasQuestions) {
                $("#question").hide();
                $("#beacons-not-found").show();
            } else {
                $("#question").show();
                $("#beacons-not-found").hide();
            }

        },
        _getFormData: function (form) {
            var data = {};
            $(form).serializeArray().forEach(function (e) {
                data[e.name] = e.value.trim();
            });
            return data;
        },
        _onSubmitNewGame: function (e) {
            e.preventDefault();

            var that = this;
            var data = this._getFormData(e.target);

            this._api.startGame(data.name, data.profession, function () {
                $("#start-new-game").hide();
                $("#end-game").show();
                that._model.clear();
                that._beaconService.start();

            });
        },
        _startGame: function () {
            $("#start-new-game").show();
            $("#end-game").hide();
        }
    };

    var document_ready = new $.Deferred();
    var device_ready = new $.Deferred();
    var ionic_ready = new $.Deferred();

    $(window.document).ready(function () {
        document_ready.resolve();
    });

    if (!!window.cordova) {
        window.document.addEventListener("deviceready", function () {
            device_ready.resolve();
        }, false);
    } else {
        device_ready.resolve();
    }

    //Use ionic for basic styling, ignore rest of angular
    angular
            .module("app", ["ionic"])
            .run(function ($ionicPlatform) {
                $ionicPlatform.ready(function () {
                    ionic_ready.resolve();
                });
            });

    $.when(document_ready, device_ready, ionic_ready).then(function () {
        var app = new App();
        app.run();
        window._app = app;

    });

    window.App = App;

})(window, window.jQuery, window.console, window._, window.angular, window.Backbone);