<?php
	/*
	 * @author: Kardo J�eleht
	 */
	if($_SESSION["verified"] != true){
		header("Location: index.php");
		die("Unauthorized access.");
	}
?>