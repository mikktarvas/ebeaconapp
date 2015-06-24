<?php
	/*
	 * @author: Kardo Jõeleht
	 */
	require_once("session_start.php");
	
	if(!isSet($_SESSION["points"]) || !isSet($_SESSION["name"]) || !isSet($_SESSION["profession"])){
		http_response_code(400);
		die("Game not started.");
	}
	$username = $_SESSION["name"];
	$profession = $_SESSION["profession"];
	$points = $_SESSION["points"];
	require_once("connection.php");
	
	$stmt = $mysqli->prepare("INSERT INTO leader_board(name, profession, score) VALUES(?, ?, ?)");
	$stmt->bind_param("ssi", $username, $profession, $points);
	$stmt->execute();
	$stmt->close();
	$insert_id = $mysqli->insert_id;
	
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
	$stmt->close();
	
	// Get user position
	$stmt = $mysqli->prepare("SELECT COUNT(*) FROM leader_board WHERE score>?");
	$stmt->bind_param("i", $points);
	$stmt->bind_result($position);
	$stmt->execute();
	$stmt->fetch();
	$stmt->close();
	
	// Since mySQL counts all bigger scores, need to add 1
	$position += 1;
	
	$user_info = new StdClass();
	$user_info->name = $username;
	$user_info->profession = $profession;
	$user_info->points = $points;
	$user_info->position = $position;
	
	$top_and_user_info = array();
	$top_and_user_info["user_info"] = $user_info;
	$top_and_user_info["leaderboard"] = $top;
	
	echo json_encode($top_and_user_info);
	
	require_once("close_connection.php");
	
	$_SESSION = array();	
	session_destroy();
?>