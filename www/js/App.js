(function (window, $, console, _, angular, Backbone) {
    "use strict";

    var ANIMATION_END = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

    function App() {

        _.extend(this, Backbone.Events);

        this._beaconService = new BeaconService();
        this._api = new Api();
        this._model = new Model();
        this._currentAnswerIds = [];

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

            //DOM listeners
            $(document).on("submit", "#start-new-game", this._onSubmitNewGame.bind(this));
            $(document).on("submit", "#question", this._onSubmitQuestion.bind(this));
            /*$(document).on("singletap", '#question .item', function (e) {
             e.preventDefault();
             e.stopPropagation();
             console.dir(arguments);
             });*/

        },
        _answerTapped: function (e) {
            console.log(e);
        },
        _onSubmitQuestion: function (e) {
            e.preventDefault();
            var data = this._getFormData(e.target);
            this._api.answerQuestion(parseInt(data["current-question-id"]), parseInt(data["current-answer-id"]), this._currentAnswerIds,
                    function (addedPoints, correctId) {
                        console.log(arguments);
                    });
            //var answerId
        },
        _beaconFound: function (beacon) {
            var that = this;
            this._api.getQuestions(beacon, function (questions) {
                questions.forEach(function (question) {
                    that._model.addQuestion(question);
                });
            });
        },
        _beaconLost: function (beacon) {

        },
        _questionsCleared: function () {
            this._checkHasQuestions();
        },
        _questionAdded: function (question) {
            this._checkHasQuestions();
            if (this._model.getCurrentQuestion() === null) {
                this._displayQuestion(question.id);
            }
        },
        _displayQuestion: function (id) {
            this._model.setCurrentId(id);
            var question = this._model.getQuestionById(id);
            $("#question .question-name").html(question.text);
            $("#current-question-id").val(id);
            var $answers = $("#question .answers-list").empty();
            var answerIds = [];
            question.answers.forEach(function (answer) {
                var $answer = $('<li class="item"><span class="text"></span><i class="fa fa-check current" style="display: none;"></i></li>');
                $answer.find(".text").html(answer.text);
                answerIds.push(answer.id);
                $answer.on("singletap", function () {
                    $("#question .fa.current").hide();
                    $("#current-answer-id").val(answer.id);
                    $answer.find(".fa.current").show();
                });
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
                that._model.clear();
                that._beaconService.start();

            });
        },
        _startGame: function () {
            $("#start-new-game").show();
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