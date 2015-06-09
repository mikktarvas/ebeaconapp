(function (window) {

    function Question(id, text, pointScale) {
        this.id = id;
        this.text = text;
        this.pointScale = pointScale;
        this.answers = [];
        this.isAnswered = false;
        this.wasCorrect = null;
    }

    Question.prototype = {
    };

    window.Question = Question;

})(window);