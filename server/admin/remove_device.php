<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");	
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Remove beacon</title>
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
	<?php
		if(isSet($_REQUEST["id"])){
			$id = $_REQUEST["id"];
			$question_count = getBeaconQuestionCount($id);
			if($question_count > 0){
				echo "<div class='message'>This beacon has questions related to it. Please delete them before removing the device.</div>";
			} else {
				removeBeacon($id);
				header("Location: main.php");
			}
		}
	?>
	<div id="back" class="btn btn-default"><a href="main.php">Back</a></div> 
	</section>
</body>
</html>