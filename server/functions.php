<?php
	/*
	 * @author: Kardo Jõeleht
	 */
	require_once("connection.php");
	
	function getUuidByQuestionId($id){
		global $mysqli;
		// Device id
		$stmt = $mysqli->prepare("SELECT device_info_id FROM questions WHERE id=?");
		$stmt->bind_param("i", $id);
		$stmt->bind_result($device_info_id);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		$stmt = $mysqli->prepare("SELECT UUID FROM device_info WHERE id=?");
		$stmt->bind_param("i", $device_info_id);
		$stmt->bind_result($uuid);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		return $uuid;
		
	}
?>