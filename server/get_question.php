<?php
	require_once("session_start.php");
	require_once("config.php");

	// uuid_ma_mi = uuid_major_minor
	if(isSet($_REQUEST["uuid_ma_mi"])){
		require_once("connection.php");
		
		// If questions package is already generated
		if(isSet($_SESSION[$_REQUEST["uuid_ma_mi"]])){
			echo json_encode($_SESSION[$_REQUEST["uuid_ma_mi"]]);
		} else {

			// Device id and name
			$stmt = $mysqli->prepare("SELECT id, name FROM device_info WHERE UUID=?");
			$stmt->bind_param("s", $_REQUEST["uuid_ma_mi"]);
			$stmt->bind_result($device_id, $device_name);
			$stmt->execute();
			$stmt->fetch();
			$stmt->close();
			
			if(empty($device_id)){
				http_response_code(404);
				die("Device not found.");
			}
			
			// Questions for device
			$all_questions_for_device = array();
			$stmt = $mysqli->prepare("SELECT id, question_text, point_scale FROM questions WHERE device_info_id=?");
			$stmt->bind_param("i", $device_id);
			$stmt->bind_result($question_id, $question_text, $point_scale);
			$stmt->execute();
			while($stmt->fetch()){
				$question = new StdClass();
				$question->id = $question_id;
				$question->text = $question_text;
				$question->point_scale = $point_scale;
				$question->answer_id = null;
				$question->correct_answer_id = null;
				array_push($all_questions_for_device, $question);
			}
			$stmt->close();
			
			foreach($all_questions_for_device as $question){
				// Get correct answers for every question
				$all_answers = array();
				$stmt = $mysqli->prepare("SELECT id, answer_text FROM answers WHERE question_id=? AND correct=1 ORDER BY RAND() LIMIT 1");
				$stmt->bind_param("i", $question->id);
				$stmt->bind_result($answer_id, $answer_text);
				$stmt->execute();
				while($stmt->fetch()){
					$correct_answer = new StdClass();
					$correct_answer->id = $answer_id;
					$correct_answer->text = $answer_text;
					array_push($all_answers, $correct_answer);
				}
				$stmt->close();

				// Get wrong answers
				$stmt = $mysqli->prepare("SELECT id, answer_text FROM answers WHERE question_id=? AND correct=0 ORDER BY RAND() LIMIT " . WRONG_ANSWER_COUNT);
				$stmt->bind_param("i", $question->id);
				$stmt->bind_result($answer_id, $answer_text);
				$stmt->execute();
				while($stmt->fetch()){
					$wrong_answer = new StdClass();
					$wrong_answer->id = $answer_id;
					$wrong_answer->text = $answer_text;
					array_push($all_answers, $wrong_answer);
				}
				$stmt->close();
				
				// Shuffle answers
				shuffle($all_answers);
				
				$question->answers = $all_answers;
				
			}
			
			shuffle($all_questions_for_device);
			
			// Save new question package
			$_SESSION[$_REQUEST["uuid_ma_mi"]] = $all_questions_for_device;
			
			echo json_encode($all_questions_for_device);
		}
		
		require_once("close_connection.php");	
		
	}
	
?>