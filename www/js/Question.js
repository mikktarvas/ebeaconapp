(function (window) {

    function Question(id, text, pointScale) {
        this.id = id;
        this.text = text;
        this.pointScale = pointScale;
        this.answers = [];
        this.isAnswered = false;
        this.correctAnswerId = null;
        this.answerId = null;
    }

    Question.prototype = {
        isCorrect: function() {
            return this.isAnswered && this.correctAnswerId === this.answerId;
        }
    };

    window.Question = Question;

})(window);