<?php
	require_once("session_start.php");
	
	if(isSet($_POST["name"]) && isSet($_POST["profession"]) && isSet($_SESSION["points"])){
		$name = $_POST["name"];
		$profession = $_POST["profession"];
		$points = $_SESSION["points"];
		require_once("connection.php");
		
		$stmt = $mysqli->prepare("INSERT INTO leader_board(name, profession, score) VALUES(?, ?, ?)");
		$stmt->bind_param("ssi", $name, $profession, $points);
		$stmt->execute();
		$stmt->close();
		
		$new_entry = new StdClass();
		$new_entry->name = $name;
		$new_entry->profession = $profession;
		$new_entry->score = $points;
		
		echo json_encode($new_entry);
		
		require_once("close_connection.php");
	}
	
	session_destroy();
?>