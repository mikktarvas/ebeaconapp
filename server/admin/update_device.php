<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");
	
	if(isSet($_REQUEST["add_a_device"])){
		$name = $_REQUEST["name"];
		$uuid = $_REQUEST["uuid"];
		$major = $_REQUEST["major"];
		$minor = $_REQUEST["minor"];
		
		// Glue the unique id together
		$uuid_ma_mi = $uuid . "_" . $major . "_" . $minor;
		
		addABeacon($name, $uuid_ma_mi);
		
		header("Location: main.php");
	}
?>