<?php
	
	require_once("session_start.php");
	require_once("config.php");
	
	if(isSet($_POST["question_id"]) && isSet($_POST["answer_id"]) && isSet($_POST["answer_ids"])){
		$question_id = $_POST["question_id"];
		$answer_id = $_POST["answer_id"];
		$answer_ids = $_POST["answer_ids"];
		
		require_once("connection.php");
		
		// Check if correct answer
		$stmt = $mysqli->prepare("SELECT correct FROM answers WHERE id=?");
		$stmt->bind_param("i", $answer_id);
		$stmt->bind_result($correct);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		$result = new StdClass();
		$result->added_points = 0;

		// If correct, get points from db		
		if($correct == 1){
			$stmt = $mysqli->prepare("SELECT point_scale FROM questions WHERE id=?");
			$stmt->bind_param("i", $question_id);
			$stmt->bind_result($point_scale);
			$stmt->execute();
			$stmt->fetch();
			$stmt->close();
			$_SESSION["points"] += $point_scale;
			$result->added_points += $point_scale;
			$result->correct_id = (int) $answer_id;
			
		} else {
			// Build string from ids
			$ids_string = implode(", ", $answer_ids);
			$ids_string = "(" . $ids_string . ")";
			
			// Find the correct answer id
			$stmt = $mysqli->prepare("SELECT id FROM answers WHERE correct=1 AND id IN " . $ids_string);
			$stmt->bind_result($correct_id);
			$stmt->execute();
			$stmt->fetch();
			$stmt->close();
			$result->correct_id = (int) $correct_id;
		}
		
		// Output results as JSON
		echo json_encode($result);
		
		require_once("close_connection.php");
		
	}
	
?>