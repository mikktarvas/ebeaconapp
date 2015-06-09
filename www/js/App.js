(function (window, $, console) {
    "use strict";

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

            this._api.startGame(function () {
                setTimeout(function () {
                    $("#loading-screen-wrapper").hide();
                }, 1000);
            });

        },
        _registerListeners: function () {

            var that = this;
            this._beaconService.on("beacons:found", this._onBeaconsFound.bind(this));
            this._model.on("question:added", this._questionAdded.bind(this));
            this._model.on("current_id:changed", this._currentIdChanged.bind(this));
            $(document).on("tap", "#leftarrow", function () {
                that.previousQuestion();
            });
            $(document).on("tap", "#rightarrow", function () {
                that.nextQuestion();
            });

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
        },
        _foundUniqueBeacon: function (beacon) {

            var that = this;
            var id = beacon.getUniqueId();
            console.info("found unique beacon", beacon, "id", id);
            this._foundBeacons[id] = beacon;
            this._api.getQuestion(id, function (question) {
                that._model.addQuestion(question);
            });

        },
        _questionAdded: function (question) {

            if (this._model._currentId === null) {
                this.displayQuestion(question.id);
            }
            this._updateMarker();
        },
        displayQuestion: function (questionId) {
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
                var $button =
                        $("<a>")
                        .attr({
                            class: "btn btn-block btn-lg btn-info"
                        })
                        .html(answer.text);
                $button.appendTo($answers);
            });
        },
        nextQuestion: function () {
            var questions = this._model.questions;
            if (questions.length === 0) {
                return;
            }
            var offset = this._model.getCurrentQuestionOffset() + 1;
            if (offset >= questions.length) {
                offset = 0;
            }
            this.displayQuestion(questions[offset].id);
        },
        previousQuestion: function () {
            var questions = this._model.questions;
            if (questions.length === 0) {
                return;
            }
            var offset = this._model.getCurrentQuestionOffset() - 1;
            if (offset < 0) {
                offset = questions.length - 1;
            }
            this.displayQuestion(questions[offset].id);
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

})(window, window.jQuery, window.console);