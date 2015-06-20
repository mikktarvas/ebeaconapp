<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Museum Race</title>
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
			<li><a href="main.php">Beacons</a></</li>
			<li><a href="add_device.php">Add a device</a></li>
			<li><a href="logout.php">Logout</a></li>
		  </ul>
		</div>
	  </div>
	</nav>
	
	<section id="main">
		<h3>Beacons</h3>
		<!--<div id="logout"><a href="logout.php">Logout</a></div>-->
		<table class="table table-hover">	
		<?php
		$devices = getAllDevices();
		// Counter for row numbers
		$counter = 1;
		foreach($devices as $device){
			echo "<div class='device'><tr> 
					<td>{$counter}</td>
					<td><strong>{$device->name}</strong> ({$device->uuid})</td>
					<td><a href='device_questions.php?id={$device->id}'>Questions</a></td> 
					<td><a href='rename_beacon.php?id={$device->id}'>Rename</a></td> 
					<td><a href='remove_device.php?id={$device->id}'>Remove</a></td></tr></div>";
					$counter++;
		}
		?>
		</table>	
		<div id="add_devices"><a href="add_device.php" type="button" class="btn btn-info">Add a device</a></div>
	</section>
</body>
</html>