(function (window, $, console) {
    "use strict";

    var API_HOST = "http://beacons.hol.es/";

    function Api() {

    }

    Api.prototype = {
        _defaultErrorHandler: function () {
            console.error(arguments);
        },
        getQuestions: function (beacon, clbk) {
            $.ajax({
                url: API_HOST + "get_question.php",
                dataType: "json",
                method: "POST",
                data: {
                    uuid_ma_mi: beacon.getUniqueId()
                },
                success: function (response) {

                    var questions = [];

                    response.forEach(function (q) {
                        var question = new Question(q.id, q.text, q.point_scale, beacon);
                        var answers = q.answers.map(function (e) {
                            return new Answer(e.id, e.text);
                        });
                        question.answers = answers;
                        question.answerId = q.answer_id;
                        question.correctAnswerId = q.correct_answer_id;
                        question.isAnswered = q.answer_id !== null;

                        questions.push(question);
                    });

                    clbk(questions);

                },
                error: this._defaultErrorHandler.bind(this)
            });
        },
        answerQuestion: function (questionId, answerId, answerIds, clbk) {
            $.ajax({
                url: API_HOST + "answer_question.php",
                dataType: "json",
                method: "POST",
                data: {
                    question_id: questionId,
                    answer_id: answerId,
                    answer_ids: answerIds
                },
                success: function (response) {
                    clbk(response.added_points, response.correct_answer_id);
                },
                error: this._defaultErrorHandler.bind(this)
            });
        },
        startGame: function (name, profession, clbk) {
            //clbk();
            $.ajax({
                url: API_HOST + "startgame.php",
                dataType: "json",
                method: "POST",
                data: {
                    name: name,
                    profession: profession
                },
                success: function () {
                    clbk();
                },
                error: this._defaultErrorHandler.bind(this)
            });
        },
        endGame: function (submitScore, name, profession, clbk) {

            var data = {};

            if (submitScore) {
                data = {
                    name: name,
                    profession: profession
                };
            }

            $.ajax({
                url: API_HOST + "endgame.php",
                dataType: "json",
                method: "POST",
                data: data,
                success: function (response) {
                    clbk(response);
                },
                error: this._defaultErrorHandler.bind(this)
            });
        }
    };

    window.Api = Api;

})(window, window.jQuery, window.console);