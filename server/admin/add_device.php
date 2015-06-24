<?php
	/*
	 * @author: Kardo Jõeleht
	 */
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");	
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Add a beacon</title>
	<script src="jquery-2.1.4.min.js"></script>
	
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="style.css">
	
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top my_navigation">
	  <div class="container-fluid">
		<div class="navbar-header">
		  <a class="navbar-brand" href="main.php">Museum Race</a>
		</div>
		<div>
		  <ul class="nav navbar-nav">
			<li><a href="main.php">Beacons</a></li>
			<li><a href="add_device.php">Add a device</a></li>
			<li><a href="logout.php">Logout</a></li>
		  </ul>
		</div>
	  </div>
	</nav>
	<section>
		<form action="update_device.php" method="post">
		<div class="row">
		<div class="col-lg-6">
			<h4>Beacon name:</h4><br>
			<input class="form-control" type="text" name="name" placeholder="Chosen name"><br><br>
			<input type="hidden" name="add_a_device">
			<h4>Beacon info (can be found with the Estimote app):</h4><br>
			<input class="form-control"type="text" name="uuid" placeholder="UUID"><br>
			<input class="form-control"type="text" name="major" placeholder="Major"><br>
			<input class="form-control" type="text" name="minor" placeholder="Minor"><br>
			<div id="back" class="btn btn-default"><a href="main.php">Back</a></div> <input type="submit" value="Add" class="btn btn-info">
		</div>
		</div>
		</form>
	</section>
</body>
</html>