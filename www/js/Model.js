/*
 * @author: Mikk Tarvas
 */
(function (window, Backbone, _) {

    function Model() {

        _.extend(this, Backbone.Events);
        this.listenTo(this, "all", function () {
            console.log.apply(console, arguments);
        });

        this._questions = [];
        this._currentId = null;
        this._score = 0;
        this._correct = 0;
        this._total = 0;

    }

    Model.prototype = {
        clear: function () {
            this._questions.length = 0;
            this.trigger("questions:cleared");
            this.setCurrentId(null);
            this.setScore(0);
            this.setTotal(0);
            this.setCorrect(0);
        },
        setCorrect: function (c) {
            this._correct = c;
            this.trigger("correct:changed", this._correct);
        },
        setTotal: function (t) {
            this._total = t;
            this.trigger("total:changed", this._total);
        },
        incrementCorrect: function (c) {
            this.setCorrect(this._correct + c);
        },
        incrementTotal: function (t) {
            this.setTotal(this._total + t);
        },
        addQuestion: function (question) {
            this._questions.push(question);
            this.trigger("question:added", question);
        },
        removeQuestion: function (id) {
            var index = -1;
            for (var i = 0; i < this._questions.length; i++) {
                if (this._questions[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                var q = this._questions[index];
                this._questions.splice(index, 1);
                this.trigger("question:removed", q);
            }
        },
        removeQuestionsByBeaconUniqueId: function (uid) {
            var indices = [];
            for (var i = 0; i < this._questions.length; i++) {
                if (this._questions[i].beacon.getUniqueId() === uid) {
                    indices.push(this._questions[i].id);
                }
            }
            indices.forEach(function (i) {
                this.removeQuestion(i);
            }, this);
        },
        getQuestionCount: function () {
            return this._questions.length;
        },
        getCurrentQuestion: function () {
            var that = this;
            if (this._currentId === null) {
                return null;
            } else {
                var q = this._questions.filter(function (question) {
                    return question.id === that._currentId;
                });
                return q[0];
            }
        },
        getCurrentId: function () {
            return this._currentId;
        },
        getScore: function () {
            return this._score;
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
        setCurrentId: function (id) {
            this._currentId = id;
            this.trigger("current_id:changed", this._currentId);
        },
        incementScore: function (points) {
            this.setScore(this._score + points);
        },
        setScore: function (score) {
            this._score = score;
            this.trigger("score:changed", this._currentId);
        },
        getCurrentOffset: function () {
            if (this._currentId === null) {
                return -1;
            }
            for (var i = 0; i < this._questions.length; i++) {
                if (this._questions[i].id === this._currentId) {
                    return i;
                }
            }
            return -1;

        },
        getTotal: function () {
            return this._questions.length;
        },
        getNextId: function () {
            var offset = this.getCurrentOffset();
            if (offset === -1) {
                return -1;
            }
            offset++;
            if (offset >= this._questions.length) {
                offset = 0;
            }
            return this._questions[offset].id;
        },
        getPreviousId: function () {
            var offset = this.getCurrentOffset();
            if (offset === -1) {
                return -1;
            }
            offset--;
            if (offset < 0) {
                offset = this._questions.length - 1;
            }
            return this._questions[offset].id;
        }
    };

    window.Model = Model;

})(window, window.Backbone, window._);