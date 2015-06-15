<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");	
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Add a beacon</title>
</head>
<body>
	<div id="back"><a href="main.php">Back</a></div>
	<form action="update_device.php" method="post">
		<input type="text" name="name" placeholder="Chosen name"><br><br>
		<input type="hidden" name="add_a_device">
		Beacon info (can be found with the Estimote app):<br>
		<input type="text" name="uuid" placeholder="UUID"><br>
		<input type="text" name="major" placeholder="Major"><br>
		<input type="text" name="minor" placeholder="Minor"><br>
		<input type="submit" value="Add">
	</form>
</body>
</html>