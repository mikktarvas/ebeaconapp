<?php
	
	require_once("session_start.php");
	require_once("config.php");
	
	if(isSet($_POST["question_id"]) && isSet($_POST["answer_id"])){
		$question_id = $_POST["question_id"];
		$answer_id = $_POST["answer_id"];
		
		require_once("connection.php");
		
		// Check if correct answer
		$stmt = $mysqli->prepare("SELECT correct FROM answers WHERE id=?");
		$stmt->bind_param("i", $answer_id);
		$stmt->bind_result($correct);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		$added_points = new StdClass();
		$added_points->added_points = 0;

		// If correct, get points from db		
		if($correct == 1){
			$stmt = $mysqli->prepare("SELECT point_scale FROM questions WHERE id=?");
			$stmt->bind_param("i", $question_id);
			$stmt->bind_result($point_scale);
			$stmt->execute();
			$stmt->fetch();
			$stmt->close();
			$_SESSION["points"] += $point_scale;
			$added_points->added_points += $point_scale;
			
		}
		
		// Output added points as JSON
		echo json_encode($added_points);
		
		require_once("close_connection.php");
		
	}
	
?>