function BeaconService() {
    var that = this;
    _.extend(this, Backbone.Events);
    if (!!window.cordova) {
        estimote.beacons.startRangingBeaconsInRegion({}, this._onRanging.bind(this), this._onRangingError.bind(this));
    } else {
        console.log("not in Cordova context, bluetooth not available");
    }

    this.beaconDistanceThreshold = 2; //In meters

}

BeaconService.prototype = {
    _onRanging: function (beaconInfo) {

        var beacons = beaconInfo.beacons.map(function (beacon) {
            return new BeaconDevice(beacon.distance, beacon.major, beacon.minor, beacon.proximityUUID);
        });

        beacons = beacons.filter(function (beacon) {
            return beacon.distance <= this.beaconDistanceThreshold;
        }, this);

        this.trigger("beacons:found", beacons);

    },
    _onRangingError: function () {
        console.error(arguments);
    }
};