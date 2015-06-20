/*
 * @author: Mikk Tarvas
 */
(function (window, _) {
    "use strict";

    function Beacon(
            distance,
            major,
            minor,
            proximityUUID,
            original
            ) {

        this.distance = distance;
        this.major = major;
        this.minor = minor;
        this.proximityUUID = proximityUUID;
        this.original = original;
        this.lastseen = _.now();

    }

    Beacon.prototype = {
        getUniqueId: function () {
            return this.proximityUUID + "_" + (this.major + "") + "_" + (this.minor + "");
        }
    };

    window.Beacon = Beacon;

})(window, window._);