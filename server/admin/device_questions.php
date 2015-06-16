<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");
	
	if(!isSet($_REQUEST["id"])){
		header("Location: main.php");
	}
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Questions</title>
	<script src="deleteConfirm.js"></script>
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
	<h3>Beacon: <?php echo getBeaconNameById($_REQUEST["id"]); ?></h3>
	<!-- <div id="back"><a href="main.php">Back</a></div>-->
		<table class="table table-hover">
			<?php
				$questions = getDeviceQuestions($_REQUEST["id"]);
				// Row numbers
				$counter = 1;
				foreach($questions as $question){
					echo "<div class='question'><tr> 
						<td>{$counter} </td> 
						<td>{$question->text} </td> 
						<td><a href='edit_question.php?id={$question->id}&device_id={$_REQUEST["id"]}'>Edit question</a> </td> 
						<td><a href='remove_question.php?id={$question->id}' class='delete_confirm'>Remove question</a></td>
						</tr></div>";
						$counter++;
				}
			?>
		</table>
		
		<div id="add_questions"><a href="main.php" class="btn btn-default">Back</a> <a href="add_question.php?device_id=<?php echo $_REQUEST["id"]; ?>" class="btn btn-info">Add a question</a></div>
	</section>
</body>
</html>