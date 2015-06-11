cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/pl.makingwaves.estimotebeacons/plugin/src/js/EstimoteBeacons.js",
        "id": "pl.makingwaves.estimotebeacons.EstimoteBeacons",
        "clobbers": [
            "estimote"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "pl.makingwaves.estimotebeacons": "0.7.1",
    "cordova-plugin-crosswalk-webview": "1.0.1-dev",
    "cordova-plugin-whitelist": "1.0.1-dev",
    "cordova-plugin-dialogs": "1.1.1-dev"
}
// BOTTOM OF METADATA
});