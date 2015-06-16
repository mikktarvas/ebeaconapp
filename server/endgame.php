<?php
	require_once("session_start.php");
	
	var_dump($_SESSION);

	if(!isSet($_SESSION["points"]) || !isSet($_SESSION["name"]) || !isSet($_SESSION["profession"])){
		http_response_code(400);
		die("Game not started.");
	}
	$name = $_SESSION["name"];
	$profession = $_SESSION["profession"];
	$points = $_SESSION["points"];
	require_once("connection.php");
	
	$stmt = $mysqli->prepare("INSERT INTO leader_board(name, profession, score) VALUES(?, ?, ?)");
	$stmt->bind_param("ssi", $name, $profession, $points);
	$stmt->execute();
	$stmt->close();
	
	// Get leaderboard and display as JSON
	$top = array();
	$stmt = $mysqli->prepare("SELECT id, name, score FROM leader_board ORDER BY score DESC LIMIT 5");
	$stmt->bind_result($id, $name, $score);
	$stmt->execute();
	while($stmt->fetch()){
		$entry = new StdClass();
		$entry->id = $id;
		$entry->name = $name;
		$entry->score = $score;
		array_push($top, $entry);
	}
	
	echo json_encode($top);
	
	require_once("close_connection.php");
	
	$_SESSION = array();	
	session_destroy();
	
?>