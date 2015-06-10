(function (window, $, console) {
    "use strict";

    var API_HOST = "http://beacons.hol.es/";

    function Api() {

    }

    Api.prototype = {
        _defaultErrorHandler: function () {
            console.error(arguments);
        },
        getQuestions: function (deviceId, clbk) {
            $.ajax({
                url: API_HOST + "get_question.php",
                dataType: "json",
                method: "POST",
                data: {
                    uuid_ma_mi: deviceId
                },
                success: function (response) {

                    var questions = [];

                    response.forEach(function (q) {
                        var question = new Question(q.id, q.text, q.point_scale);
                        console.log(q.answers);
                        var answers = q.answers.map(function (e) {
                            return new Answer(e.id, e.text);
                        });
                        question.answers = answers;
                        questions.push(question);
                    });

                    console.log(questions);

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
                    clbk(response.added_points, response.correct_id);
                },
                error: this._defaultErrorHandler.bind(this)
            });
        },
        startGame: function (clbk) {
            $.ajax({
                url: API_HOST + "startgame.php",
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: {},
                success: function () {
                    clbk();
                },
                error: this._defaultErrorHandler.bind(this)
            });
        },
        endGame: function (name, profession, clbk) {
            //name, profession
            $.ajax({
                url: API_HOST + "endgame.php",
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: {
                    name: name,
                    profession: profession
                },
                success: function (response) {
                    clbk();
                },
                error: this._defaultErrorHandler.bind(this)
            });
        }
    };

    window.Api = Api;

})(window, window.jQuery, window.console);