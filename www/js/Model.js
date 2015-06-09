(function (window, Backbone, _) {

    function Model() {
        _.extend(this, Backbone.Events);
        this._questions = [];
    }

    Model.prototype = {
        addQuestion: function (question) {
            this._questions.push(question);
        }
    };

    window.Model = Model;

})(window, window.Backbone, window._);