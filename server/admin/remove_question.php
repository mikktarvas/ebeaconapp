<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");	
	
	if(isSet($_REQUEST["id"])){
		$id = $_REQUEST["id"];
		
		// Device id to return to device questions
		$device_id = getDeviceIdByQuestionId($id);
		
		// Delete all the answers
		deleteAnswersByQuestionId($id);
		
		// Delete question itself
		deleteQuestionById($id);

		header("Location: device_questions.php?id={$device_id}");
	}
?>