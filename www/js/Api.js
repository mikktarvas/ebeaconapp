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
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: {
                    uuid_ma_mi: deviceId
                },
                success: function (response) {
                    clbk();
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