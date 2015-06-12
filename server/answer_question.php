<?php
	
	require_once("session_start.php");
	require_once("config.php");
	require_once("functions.php");
	
	if(isSet($_REQUEST["question_id"]) && isSet($_REQUEST["answer_id"]) && isSet($_REQUEST["answer_ids"])){
		$question_id = $_REQUEST["question_id"];
		$answer_id = $_REQUEST["answer_id"];
		$answer_ids = $_REQUEST["answer_ids"];
		
		$uuid_ma_mi = getUuidByQuestionId($question_id);
		
		if(isSet($_SESSION[$uuid_ma_mi])){
		
			
			// Find question in package
			$question_package = $_SESSION[$uuid_ma_mi];
			foreach($question_package as $question){
				if($question->id == $question_id){
					if(empty($question->answer_id)){
						$question->answer_id = $answer_id;
					} else {
						http_response_code(400);
						die("This question has already been answered.");
					}
					break;
				}
			}
			
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
		} else {
			http_response_code(400);
			die("This question has not been served.");
		}
		
		require_once("close_connection.php");
		
	}
	
?>