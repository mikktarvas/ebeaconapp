<?php
	/*
	 * @author: Kardo Jõeleht
	 */
	if($_SESSION["verified"] != true){
		header("Location: index.php");
		die("Unauthorized access.");
	}
?>