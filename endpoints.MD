## GetQuestion

Päring: POST {device_id}

Vastus: {question,answers}

## AnswerQuestion

Päring: POST {question_id,answer_id}

Vastus: {points_received}

## StartGame

Päring: genereerida uus session id 0 punktiga

## EndGame

Päring: POST {name}, sisestada nimi + skoor tabelisse