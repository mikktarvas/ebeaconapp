<?php
	/*
	 * @author: Kardo Jõeleht
	 */
	require_once("session_start.php");
	require_once("functions.php");
	require_once("login_config.php");
	
	if(isSet($_POST["username"]) && isSet($_POST["password"])){
		if($_POST["username"] == USER && $_POST["password"] == PASS){
			$_SESSION["verified"] = true;
			header("Location: main.php");
		} else {
			header("Location: index.php");
		}
	}

?>