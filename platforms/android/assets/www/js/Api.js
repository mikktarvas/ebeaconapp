(function (window, $, console) {
    "use strict";

    var API_HOST = "http://beacons.hol.es/";

    function Api() {

    }

    Api.prototype = {
        _defaultErrorHandler: function () {
            console.error(arguments);
        },
        getQuestion: function (deviceId, clbk) {
            $.ajax({
                url: API_HOST + "get_question.php",
                dataType: "json",
                method: "POST",
                data: {
                    uuid_ma_mi: deviceId
                },
                success: function (response) {
                    var question = new Question(
                            response.question.id,
                            response.question.text,
                            response.question.point_scale
                            );
                    var answers = response.answers.map(function (e) {
                        return new Answer(e.id, e.text);
                    });
                    question.answers = answers;
                    clbk(question);
                },
                error: this._defaultErrorHandler.bind(this)
            });
        },
        startGame: function (clbk) {
            $.ajax({
                url: API_HOST + "startgame.php",
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: {},
                success: function (response) {
                    clbk();
                },
                error: this._defaultErrorHandler.bind(this)
            });
        },
        endGame: function (name, clbk) {
            $.ajax({
                url: API_HOST + "startgame.php",
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: {
                    name: name
                },
                success: function (response) {
                    clbk();
                },
                error: this._defaultErrorHandler.bind(this)
            });
        }
    };

    window.Api = Api;

})(window, window.jQuery, window.console);