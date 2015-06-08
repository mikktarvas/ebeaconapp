function App() {

}

App.prototype = {
    run: function () {
        console.info("application run");
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