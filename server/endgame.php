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
		
		// Get leaderboard and display as JSON
		$top10 = array();
		$stmt = $mysqli->prepare("SELECT id, name, score FROM leader_board ORDER BY score DESC LIMIT 5");
		$stmt->bind_result($id, $name, $score);
		$stmt->execute();
		while($stmt->fetch()){
			$entry = new StdClass();
			$entry->id = $id;
			$entry->name = $name;
			$entry->score = $score;
			array_push($top10, $entry);
		}
		
		echo json_encode($top10);
		
		require_once("close_connection.php");

		$_SESSION = array();	
		session_destroy();
	} else {
		http_response_code(400);
		die("Game not started.");
	}
	
?>