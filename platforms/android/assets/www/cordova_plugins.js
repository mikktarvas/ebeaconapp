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
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "pl.makingwaves.estimotebeacons": "0.7.1",
    "cordova-plugin-crosswalk-webview": "1.0.1-dev",
    "cordova-plugin-whitelist": "1.0.1-dev"
}
// BOTTOM OF METADATA
});