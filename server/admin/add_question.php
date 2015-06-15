<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");	
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Add question</title>
	<script src="answer.js"></script>
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
	<h3>Beacon: <?php echo getBeaconNameById($_REQUEST["device_id"]); ?></h3>
	
	<form action="update_question.php" method="post">
	<div class="row">
		<div class="col-lg-6">
		<h4>Question:</h4><br>
		<input type="hidden" name="add_new_question">
		<input type="hidden" name="device_id" value="<?php echo $_REQUEST["device_id"]; ?>">
		<p>Question text: <input class="form-control" type="text" placeholder="Question text" name="question_text"></p><br>
		<p>Question points: <input class="form-control" type="text" placeholder="Points" name="points"></p><br>
		</div>
		</div>
		<h4>Answers:</h4><br>
		<div class="row">
		<div id="answer_container">
				<div class="answer">
					<div class="col-lg-6">
						<input type="text" class="form-control" placeholder="Answer text" name="answer_texts[]">
					</div>
					<div class="col-lg-2">
						<select name="answer_corrects[]" class="form-control">
							<option value="1" selected="selected">True</option>
							<option value="0">False</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<a href="#" id="answer_adder">Add answer</a><br>
		<div id="back" class="btn btn-default"><a href="device_questions.php?id=<?php echo $_REQUEST["device_id"]; ?>">Back</a></div> <input type="submit" value="Save" class="btn btn-info">
		
	</form>
	</section>
	
</body>
</html>