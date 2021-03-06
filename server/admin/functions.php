<?php
	/*
	 * @author: Kardo J�eleht
	 */
	require_once("../mysql_config.php");
	
	$mysqli = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PASS, DB);
	
	function getAllDevices(){
		global $mysqli;
		$devices = array();
		$stmt = $mysqli->prepare("SELECT id, UUID, name FROM device_info");
		$stmt->bind_result($id, $uuid, $name);
		$stmt->execute();
		while($stmt->fetch()){
			$device = new StdClass();
			$device->id = $id;
			$device->uuid = $uuid;
			$device->name = $name;
			array_push($devices, $device);
		}
		$stmt->close();
		return $devices;
	}
	
	// This function uses device id assigned by database, not uuid
	function getDeviceQuestions($id){
		global $mysqli;
		$questions = array();
		$stmt = $mysqli->prepare("SELECT id, question_text, point_scale FROM questions WHERE device_info_id=?");
		$stmt->bind_param("i", $id);
		$stmt->bind_result($id, $text, $points);
		$stmt->execute();
		while($stmt->fetch()){
			$question = new StdClass();
			$question->id = $id;
			$question->text = $text;
			$question->points = $points;
			array_push($questions, $question);
		}
		$stmt->close();
		return $questions;
	}

	function getQuestionInfo($id){
		global $mysqli;
		$stmt = $mysqli->prepare("SELECT id, question_text, point_scale FROM questions WHERE id=?");
		$stmt->bind_param("i", $id);
		$stmt->bind_result($id, $text, $points);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		$result = new StdClass();
		$result->id = $id;
		$result->text = $text;
		$result->points = $points;
		
		return $result;
	}
	
	function getAnswers($question_id){
		global $mysqli;
		$answers = array();
		$stmt = $mysqli->prepare("SELECT id, answer_text, correct FROM answers WHERE question_id=? ORDER BY id ASC");
		$stmt->bind_param("i", $question_id);
		$stmt->bind_result($id, $text, $correct);
		$stmt->execute();
		while($stmt->fetch()){
			$answer = new StdClass();
			$answer->id = $id;
			$answer->text = $text;
			$answer->correct = $correct;
			array_push($answers, $answer);
		}
		$stmt->close();
		return $answers;
	}
	
	function getDeviceIdByQuestionId($question_id){
		global $mysqli;
		$stmt = $mysqli->prepare("SELECT device_info_id FROM questions WHERE id=?");
		$stmt->bind_param("i", $question_id);
		$stmt->bind_result($device_id);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		return $device_id;
	}
	
	function updateQuestion($id, $text, $points){
		global $mysqli;
		$stmt = $mysqli->prepare("UPDATE questions SET question_text=?, point_scale=? WHERE id=?");
		$stmt->bind_param("sii", $text, $points, $id);
		$stmt->execute();
		$stmt->close();
	}
	
	function updateAnswer($id, $text, $correct){
		global $mysqli;
		$stmt = $mysqli->prepare("UPDATE answers SET answer_text=?, correct=? WHERE id=?");
		$stmt->bind_param("sii", $text, $correct, $id);
		$stmt->execute();
		$stmt->close();
	}
	
	function getBeaconNameById($id){
		global $mysqli;
		$stmt = $mysqli->prepare("SELECT name FROM device_info WHERE id=?");
		$stmt->bind_param("i", $id);
		$stmt->bind_result($name);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		return $name;
	}
	
	// Inserts a question and returns it's id
	function addQuestion($device_info_id, $point_scale, $question_text){
		global $mysqli;
		$stmt = $mysqli->prepare("INSERT INTO questions(question_text, point_scale, device_info_id) VALUES(?, ?, ?)");
		$stmt->bind_param("sii", $question_text, $point_scale, $device_info_id);
		$stmt->execute();
		$stmt->close();
		
		return $mysqli->insert_id;
	}
	
	function addAnswer($answer_text, $correct, $question_id){
		global $mysqli;
		$stmt = $mysqli->prepare("INSERT INTO answers(answer_text, correct, question_id) VALUES(?, ?, ?)");
		$stmt->bind_param("sii", $answer_text, $correct, $question_id);
		$stmt->execute();
		$stmt->close();
	}
	
	function addABeacon($name, $uuid_ma_mi){
		global $mysqli;
		$stmt = $mysqli->prepare("INSERT INTO device_info(UUID, name) VALUES(?, ?)");
		$stmt->bind_param("ss", $uuid_ma_mi, $name);
		$stmt->execute();
		$stmt->close();
	}
	
	function getBeaconQuestionCount($id){
		global $mysqli;
		$count = 0;
		$stmt = $mysqli->prepare("SELECT COUNT(*) FROM questions WHERE device_info_id=?");
		$stmt->bind_param("i", $id);
		$stmt->bind_result($count);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		return $count;
	}
	
	function removeBeacon($id){
		global $mysqli;
		$stmt = $mysqli->prepare("DELETE FROM device_info WHERE id=?");
		$stmt->bind_param("i", $id);
		$stmt->execute();
		$stmt->close();
	}
	
	function deleteAnswersByQuestionId($question_id){
		global $mysqli;
		$stmt = $mysqli->prepare("DELETE FROM answers WHERE question_id=?");
		$stmt->bind_param("i", $question_id);
		$stmt->execute();
		$stmt->close();
	}

	function deleteQuestionById($id){
		global $mysqli;
		$stmt = $mysqli->prepare("DELETE FROM questions WHERE id=?");
		$stmt->bind_param("i", $id);
		$stmt->execute();
		$stmt->close();	
	}
	
	function updateBeaconNameById($id, $new_name){
		global $mysqli;
		$stmt = $mysqli->prepare("UPDATE device_info SET name=? WHERE id=?");
		$stmt->bind_param("si", $new_name, $id);
		$stmt->execute();
		$stmt->close();
	}
	
	function removeQuestionAnswers($id){
		global $mysqli;
		$stmt = $mysqli->prepare("DELETE FROM answers WHERE question_id=?");
		$stmt->bind_param("i", $id);
		$stmt->execute();
		$stmt->close();
	}
	
?>