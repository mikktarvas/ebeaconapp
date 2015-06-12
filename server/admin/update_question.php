<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");
	
	if(isSet($_POST["question_id"])){
		$question_id = $_POST["question_id"];
		$question_text = $_POST["question_text"];
		$points = $_POST["points"];
		$answer_texts = $_POST["answer_texts"];
		$answer_corrects = $_POST["answer_corrects"];
		$answer_ids = $_POST["answer_ids"];
		// Updating a question
		updateQuestion($question_id, $question_text, $points);
		
		// Updating all the answers
		for($i=0; $i<count($answer_texts); $i++){
			updateAnswer($answer_ids[$i], $answer_texts[$i], $answer_corrects[$i]);
		}
		echo "Question_id: $question_id <br>";
		$device_id = getDeviceIdByQuestionId($question_id);
		echo $device_id;
		//header("Location: edit_question.php?id={$question_id}&device_id={$device_id}");
	}
?>