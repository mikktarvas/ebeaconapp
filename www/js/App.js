(function (window, $, console, _) {
    "use strict";

    var ANIMATION_END = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

    function App() {

        this._beaconService = new BeaconService();
        this._api = new Api();
        this._model = new Model();
        this._foundBeacons = {};

    }

    App.prototype = {
        run: function () {

            console.info("application run");

            this._registerListeners();
            this._scoreChanged(0);
            this._checkQuestionFound();
            this._api.startGame(function () {
                setTimeout(function () {
                    $("#loading-screen-wrapper").hide();
                }, 1000);
            });

        },
        _registerListeners: function () {

            window.document.addEventListener("backbutton", this._onBackButton.bind(this), false);
            this._beaconService.on("beacons:found", this._onBeaconsFound.bind(this));
            this._model.on("question:added", this._questionAdded.bind(this));
            this._model.on("score:changed", this._scoreChanged.bind(this));
            this._model.on("current_id:changed", this._currentIdChanged.bind(this));
            $(document).on("click", "#leftarrow", this.previousQuestion.bind(this));
            $(document).on("click", "#rightarrow", this.nextQuestion.bind(this));
            $(document).on("click", "#submit-score", this._tapSubmitScore.bind(this));
            $(document).on("click", "#finish", this._tapFinish.bind(this));
            $(document).on("click", "#close-leaderboard", this._closeLeaderBoard.bind(this));
            $(document).on("click", "#start-game", this._startGame.bind(this));
            $("html").on("swipeleft", this.nextQuestion.bind(this));
            $("html").on("swiperight", this.previousQuestion.bind(this));

        },
        _onBackButton: function () {
            navigator.notification.confirm(
                    "Are you sure you want to exit app? All progress will be lost.",
                    function (r) {
                        if (r == 1) {
                            navigator.app.exitApp();
                        }
                    },
                    "Exit application"
                    );
        },
        _startNewGame: function () {
            this._model.clear();
            this._foundBeacons = {};
            this._checkQuestionFound();
        },
        _startGame: function () {
            var that = this;
            this._api.startGame(function () {
                $('#endgame-modal').modal("hide");
                that._startNewGame();
            });
        },
        _closeLeaderBoard: function () {
            var that = this;
            this._api.startGame(function () {
                $("#leaderboard-modal").modal("hide");
                that._startNewGame();
            });
        },
        _tapFinish: function () {
            $('#endgame-modal').modal("show");
            $('#endgame-modal .error').hide();
            $('#endgame-modal input').val("");
        },
        _tapSubmitScore: function () {

            var $form = $("#score-form");
            var data = {};
            $form.serializeArray().forEach(function (e) {
                data[e.name] = e.value.trim();
            });
            var formIncomplete = data.name === "" || data.profession === "";
            if (formIncomplete) {
                var $e = $("#endgame-modal");
                $("#endgame-modal .error").show();
                $e.removeClass("animated bounce").addClass("animated bounce").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                    $e.removeClass("animated bounce");
                });
            } else {
                this._api.endGame(true, data.name, data.profession, function (leaderboard) {
                    $('#endgame-modal').modal("hide");
                    $("#leaderboard-modal").modal("show");
                    var $lb = $("#leaderboard").empty();

                    leaderboard.forEach(function (e) {
                        var toAppend = '<a class="list-group-item"><h4 class="list-group-item-heading">' + e.name + ': ' + e.score + '</h4></a>';
                        $lb.append(toAppend);
                    });
                });
            }

        },
        _scoreChanged: function (newScore) {
            $("#score").html(newScore);
        },
        _onBeaconsFound: function (beacons) {
            beacons.forEach(function (beacon) {
                var id = beacon.getUniqueId();
                if (!this._foundBeacons.hasOwnProperty(id)) {
                    this._foundUniqueBeacon(beacon);
                }
            }, this);
        },
        _currentIdChanged: function () {
            this._updateMarker();
        },
        _updateMarker: function () {
            var offset = this._model.getCurrentQuestionOffset() + 1;
            var total = this._model.questions.length;
            var placheholder = offset + "/" + total;
            $("#page").html(placheholder);
            $("#unaswered").html(this._model.getUnansweredCount());
        },
        _foundUniqueBeacon: function (beacon) {

            var that = this;
            var id = beacon.getUniqueId();
            console.info("found unique beacon", beacon, "id", id);
            this._foundBeacons[id] = beacon;
            this._api.getQuestions(id, function (questions) {
                questions.forEach(function (question) {
                    that._model.addQuestion(question);
                });
            });

        },
        _checkQuestionFound: function () {

            var hasQuestions = this._model.questions.length !== 0;

            if (hasQuestions) {
                $("#main").show();
                $("#bt-notice").hide();
            } else {
                $("#main").hide();
                $("#bt-notice").show();
            }

        },
        _questionAdded: function (question) {

            this._checkQuestionFound();

            if (this._model._currentId === null) {
                this.displayQuestion(question.id);
            }
            this._updateMarker();

        },
        _answerQuestion: function (questionId, answerId, answerIds, clbk) {

            var that = this;

            this._api.answerQuestion(questionId, answerId, answerIds, function (addedPoints, correctId) {

                var correct = addedPoints !== 0 && answerId === correctId;
                if (correct) {
                    that._model.incementScore(addedPoints);
                }

                (clbk || _.noop)(addedPoints, correctId);

            });

        },
        displayQuestion: function (questionId) {

            var that = this;
            var answerIds = [];

            var questions = this._model.questions.filter(function (question) {
                return question.id === questionId;
            });

            if (questions.length !== 1) {
                throw new Error("invalid question id:", questionId);
            }

            var question = questions[0];
            this._model.setCurrentId(question.id);

            $("#question").html(question.text);
            var $answers = $("#answers").empty();
            question.answers.forEach(function (answer) {

                var content = "<i class=\"fa fa-check\"></i>" + answer.text;

                var $button =
                        $("<button>")
                        .attr({
                            class: "btn btn-block btn-lg btn-info answer"
                        })
                        .prop("disabled", question.isAnswered)
                        .html(content)
                        .appendTo($answers);

                if (!question.isAnswered) {
                    $button.on("click", function () {
                        question.isAnswered = true;
                        question.answerId = answer.id;
                        $("#answers button").prop("disabled", true);
                        that._answerQuestion(questionId, answer.id, answerIds, function (addedPoints, correctId) {
                            question.correctAnswerId = correctId;
                            that.displayQuestion(questionId);
                        });
                    });
                } else {

                    var correct = question.isCorrect();
                    if (correct && answer.id === question.answerId) {
                        $button.addClass("green-border");
                    } else if (!correct && answer.id === question.answerId) {
                        $button.addClass("red-border");
                    } else if (!correct && answer.id === question.correctAnswerId) {
                        $button.find(".fa").show();
                    }
                }

                answerIds.push(answer.id);

            });
        },
        nextQuestion: function () {
            console.info("trigger", "nextquestion");
            var that = this;

            var $e = $("#main");
            $e.removeClass("animated slideOutLeft").addClass("animated slideOutLeft").one(ANIMATION_END, function () {
                $e.removeClass("animated slideOutLeft");

                var questions = that._model.questions;
                if (questions.length === 0) {
                    return;
                }
                var offset = that._model.getCurrentQuestionOffset() + 1;
                if (offset >= questions.length) {
                    offset = 0;
                }
                that.displayQuestion(questions[offset].id);

                $e.removeClass("animated slideInRight").addClass("animated slideInRight").one(ANIMATION_END, function () {
                    $e.removeClass("animated slideInRight");
                });
            });

        },
        previousQuestion: function () {
            console.info("trigger", "previousquestion");
            var that = this;

            var $e = $("#main");
            $e.removeClass("animated slideOutRight").addClass("animated slideOutRight").one(ANIMATION_END, function () {
                $e.removeClass("animated slideOutRight");

                var questions = that._model.questions;
                if (questions.length === 0) {
                    return;
                }
                var offset = that._model.getCurrentQuestionOffset() - 1;
                if (offset < 0) {
                    offset = questions.length - 1;
                }
                that.displayQuestion(questions[offset].id);

                $e.removeClass("animated slideInLeft").addClass("animated slideInLeft").one(ANIMATION_END, function () {
                    $e.removeClass("animated slideInLeft");
                });
            });
        }
    };

    var document_ready = new $.Deferred();
    var device_ready = new $.Deferred();

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

    $.when(document_ready, device_ready).then(function () {

        var app = new App();
        app.run();
        window._app = app;

    });

    window.App = App;

})(window, window.jQuery, window.console, window._);