<?php
	require_once("connection.php");
	
	function getUuidByQuestionId($id){
		global $mysqli;
		$stmt = $mysqli->prepare("SELECT questions.id, device_info.UUID FROM questions, device_info WHERE questions.id=? AND device_info.id=questions.id");
		$stmt->bind_param("i", $id);
		$stmt->bind_result($id, $uuid);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		return $uuid;
		
	}
?>