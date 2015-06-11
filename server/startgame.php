<?php
	require_once("session_start.php");
	$_SESSION["points"] = 0;
	$visited_devices = array();
	$_SESSION["visited_devices"] = $visited_devices;
	echo "{}";
	
?>