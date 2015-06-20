(function (window, console, Backbone, _) {
    "use strict";

    function BeaconService() {

        _.extend(this, Backbone.Events);
        this.listenTo(this, "all", function () {
            console.log.apply(console, arguments);
        });

        this.beaconDistanceRadius = 3;
        this.beaconTimeout = 15 * 1000;
        this._currentBeacons = [];
        this.isStarted = false;

        if (window.cordova) {
            window.estimote.beacons.startRangingBeaconsInRegion({}, this._onRanging.bind(this), this._onRangingError.bind(this));
        } else {
            console.log("not in Cordova context, bluetooth not available");
        }

    }

    BeaconService.prototype = {
        start: function () {
            this.isStarted = true;
        },
        stop: function () {
            this.isStarted = false;
            this._currentBeacons.length = 0;
        },
        _onRanging: function (beaconInfo) {

            if (!this.isStarted) {
                return;
            }

            try {

                var time = _.now();

                var newBeacons = [];
                var lostBeacons = [];
                var copy = [];

                var beacons = beaconInfo.beacons.map(function (beacon) {
                    return new Beacon(beacon.distance, beacon.major, beacon.minor, beacon.proximityUUID, beacon);
                }, this).filter(function (beacon) {
                    return beacon.distance <= this.beaconDistanceRadius;
                }, this);

                beacons.forEach(function (beacon) {
                    var id = beacon.getUniqueId();
                    if (!this._idExists(this._currentBeacons, id)) {
                        newBeacons.push(beacon);
                        copy.push(beacon);
                    }
                }, this);

                this._currentBeacons.forEach(function (beacon) {

                    var id = beacon.getUniqueId();
                    var exists = this._idExists(beacons, id);

                    if (exists) {
                        beacon.lastseen = _.now();
                    }

                    if (!exists && time - beacon.lastseen > this.beaconTimeout) {
                        lostBeacons.push(beacon);
                    } else {
                        copy.push(beacon);

                    }
                }, this);

                this._currentBeacons = copy;

                if (newBeacons.length !== 0) {
                    this._triggerNew(newBeacons);
                }

                if (lostBeacons.length !== 0) {
                    this._triggerLost(lostBeacons);
                }

            } catch (e) {
                console.error(e);
                throw e;
            }

        },
        _onRangingError: function () {
            console.error(arguments);
        },
        _triggerNew: function (beacons) {
            beacons.forEach(function (beacon) {
                this.trigger("beacon:found", beacon);
            }, this);
        },
        _triggerLost: function (beacons) {
            beacons.forEach(function (beacon) {
                this.trigger("beacon:lost", beacon);
            }, this);
        },
        _idExists: function (arr, id) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].getUniqueId() === id) {
                    return true;
                }
            }
            return false;
        }
    };

    window.BeaconService = BeaconService;

})(window, window.console, window.Backbone, window._);