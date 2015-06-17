<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");
	
	$beacon_name = getBeaconNameById($_REQUEST["id"]);
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Rename beacon</title>
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
	<h3>Rename beacon: <?php echo $beacon_name; ?></h3>
	<form action="update_device.php" method="post">
		<div class="row">
		<div class="col-lg-6">
			<input type="hidden" name="beacon_id" value="<?php echo $_REQUEST["id"]; ?>">
			<input class="form-control" type="text" name="new_name" placeholder="New name" value="<?php echo $beacon_name; ?>">
			<br>
			<div id="back" class="btn btn-default"><a href="main.php">Back</a></div> <input type="submit" value="Update" class="btn btn-info">
		</div>
		</div>
	</form>
	</section>
</body>
</html>