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

            this._beaconService.on("beacons:found", this._onBeaconsFound.bind(this));

        },
        _onBeaconsFound: function (beacons) {
            beacons.forEach(function (beacon) {
                var id = beacon.getUniqueId();
                if (!this._foundBeacons.hasOwnProperty(id)) {
                    this._foundUniqueBeacon(beacon);
                }
            }, this);
        },
        _foundUniqueBeacon: function (beacon) {

            var that = this;
            var id = beacon.getUniqueId();
            console.info("found unique beacon", beacon, "id", id);
            this._foundBeacons[id] = beacon;
            this._api.getQuestion(id, function (question) {
                that._model.addQuestion(question);
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

    });

    window.App = App;

})(window, window.jQuery, window.console);