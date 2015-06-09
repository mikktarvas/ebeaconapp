(function (window, Backbone, _) {

    function Model() {
        _.extend(this, Backbone.Events);
        this.questions = [];
        this.currentId = null;
    }

    Model.prototype = {
        addQuestion: function (question) {
            this.questions.push(question);
            this.trigger("question:added", question);
        },
        getAnsweredCount: function () {
            return this.questions.filter(function (question) {
                return question.isAnswered;
            }).length;
        },
        getUnansweredCount: function () {
            return this.questions.length - this.getAnsweredCount();
        }
    };

    window.Model = Model;

})(window, window.Backbone, window._);