function BeaconDevice(
        distance,
        major,
        minor,
        proximityUUID
        ) {

    this.distance = distance;
    this.major = major;
    this.minor = minor;
    this.proximityUUID = proximityUUID;

}

BeaconDevice.prototype = {
    getUniqueId: function () {
        return this.proximityUUID + "_" + (this.major + "") + "_" + (this.minor + "");
    }
};