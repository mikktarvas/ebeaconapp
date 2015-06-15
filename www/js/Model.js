(function (window, Backbone, _) {

    function Model() {

        _.extend(this, Backbone.Events);
        this.listenTo(this, "all", function () {
            console.log.apply(console, arguments);
        });

        this._questions = [];
        this._currentId = null;
        this._score = 0;

    }

    Model.prototype = {
        clear: function () {
            this._currentId = null;
            this._score = 0;
            this._questions.length = 0;
            this.trigger("questions:cleared");
        },
        addQuestion: function (question) {
            this._questions.push(question);
            this.trigger("question:added", question);
        },
        getQuestionCount: function () {
            return this._questions.length;
        },
        getCurrentQuestion: function () {
            var that = this;
            if (this._currentId === null) {
                return null;
            } else {
                return this._questions.filter(function (question) {
                    return question.id === that._currentId;
                }).pop();
            }
        },
        getQuestionById: function (id) {
            var questions = this._questions.filter(function (question) {
                return question.id === id;
            });
            if (questions.length === 0) {
                throw new Error("question id " + id + " not found");
            } else if (questions.length > 1) {
                throw new Error("multiple questions found for id " + id);
            } else {
                return questions.pop();
            }
        },
        setCurrentId: function(id) {
            this._currentId = id;
        }
    };

    window.Model = Model;

})(window, window.Backbone, window._);