(function (window) {

    function Question(id, text, pointScale, beacon) {
        this.id = id;
        this.text = text;
        this.pointScale = pointScale;
        this.answers = [];
        this.isAnswered = false;
        this.correctAnswerId = null;
        this.answerId = null;
        this.beacon = beacon;
    }

    Question.prototype = {
        isCorrect: function () {
            return this.isAnswered && this.correctAnswerId === this.answerId;
        }
    };

    window.Question = Question;

})(window);