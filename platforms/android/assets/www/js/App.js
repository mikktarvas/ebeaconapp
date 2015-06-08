function App() {

    this._beaconService = new BeaconService();
    this._foundBeacons = {};

}

App.prototype = {
    run: function () {

        console.info("application run");
        this._beaconService.on("beacons:found", function (beacons) {
            beacons.forEach(function (beacon) {
                var id = beacon.getUniqueId();
                if (!this._foundBeacons.hasOwnProperty(id)) {
                    this._foundUniqueBeacon(beacon);
                }
            }, this);
        }, this);

    },
    _foundUniqueBeacon: function (beacon) {
        var id = beacon.getUniqueId();
        this._foundBeacons[id] = beacon;
        console.info("found unique beacon", beacon, "id", id);
    }
};

var document_ready = new $.Deferred();
var device_ready = new $.Deferred();

$(window.document).ready(function () {
    document_ready.resolve();
});

if (!!window.cordova) {
    document.addEventListener("deviceready", function () {
        device_ready.resolve();
    }, false);
} else {
    device_ready.resolve();
}

$.when(document_ready, device_ready).then(function () {

    var app = new App();
    app.run();

});