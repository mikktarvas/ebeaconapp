(function (window, Backbone, _) {

    function Model() {
        _.extend(this, Backbone.Events);
        this.questions = [];
        this._currentId = null;
        this._score = 0;
    }

    Model.prototype = {
        clear: function () {
            this.questions.length = 0;
            this.setCurrentId(null);
            this._score = 0;
            this.trigger("score:changed", 0);
            this.trigger("current_id:changed", null);
        },
        incementScore: function (toAdd) {
            this._score += toAdd;
            this.trigger("score:changed", this._score);
        },
        getScore: function () {
            return this._score;
        },
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
        },
        setCurrentId: function (id) {
            this._currentId = id;
            this.trigger("current_id:changed", id);
        },
        getCurrentQuestionOffset: function () {
            if (this.currentId === null) {
                return -1;
            } else {
                for (var i = 0; i < this.questions.length; i++) {
                    if (this._currentId === this.questions[i].id) {
                        return i;
                    }
                }
                return -1;
            }
        }
    };

    window.Model = Model;

})(window, window.Backbone, window._);