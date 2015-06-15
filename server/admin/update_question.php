<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");
	
	// If question_id is set, we know we want to update
	if(isSet($_REQUEST["question_id"])){
		$question_id = $_REQUEST["question_id"];
		$question_text = $_REQUEST["question_text"];
		$points = $_REQUEST["points"];
		$answer_texts = $_REQUEST["answer_texts"];
		$answer_corrects = $_REQUEST["answer_corrects"];
		$answer_ids = $_REQUEST["answer_ids"];
		// Updating a question
		updateQuestion($question_id, $question_text, $points);
		
		// Updating all the answers
		for($i=0; $i<count($answer_texts); $i++){
			updateAnswer($answer_ids[$i], $answer_texts[$i], $answer_corrects[$i]);
		}
		$device_id = getDeviceIdByQuestionId($question_id);
		header("Location: edit_question.php?id={$question_id}&device_id={$device_id}");
	}
	
	// Adding a new question
	if(isSet($_REQUEST["add_new_question"])){
		$device_id = $_REQUEST["device_id"];
		$point_scale = $_REQUEST["points"];
		$question_text = $_REQUEST["question_text"];
		$answer_texts = $_REQUEST["answer_texts"];
		$answer_corrects = $_REQUEST["answer_corrects"];
		
		$question_id = addQuestion($device_id, $point_scale, $question_text);
		
		for($i=0; $i<count($answer_texts); $i++){
			addAnswer($answer_texts[$i], $answer_corrects[$i], $question_id);
		}
		
		header("Location: device_questions.php?id={$device_id}");
	}
?>