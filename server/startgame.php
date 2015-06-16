<?php
	require_once("session_start.php");
	$_SESSION = array();
	if(isSet($_REQUEST["name"]) && isSet($_REQUEST["profession"])){
		$_SESSION["name"] = $_REQUEST["name"];
		$_SESSION["profession"] = $_REQUEST["profession"]; 
		$_SESSION["points"] = 0;
		echo "{}";		
	} else {
		http_response_code(400);
		die("Name and profession required.");
	}
	
?>