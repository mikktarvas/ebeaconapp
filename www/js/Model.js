(function (window, Backbone, _) {

    function Model() {
        _.extend(this, Backbone.Events);
    }

    Model.prototype = {
    };

    window.Model = Model;

})(window, window.Backbone, window._);