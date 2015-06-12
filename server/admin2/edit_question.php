<?php
	require_once("session_start.php");
	require_once("verified.php");
	require_once("functions.php");
	
	if(!isSet($_REQUEST["id"]) || !isSet($_REQUEST["device_id"])){
		header("Location: main.php");
	}
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Edit question</title>
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
		  <a class="navbar-brand" href="main.php">Beacons</a>
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
		$question = getQuestionInfo($_REQUEST["id"]);
		$answers = getAnswers($_REQUEST["id"]);
	?>
	
	<form action="update_question.php" method="post">
		<h3>Question:</h3><br>
		<input type="hidden"  name="question_id" value="<?php echo $_REQUEST["id"]; ?>">
		<p>Question text: <input class="form-control" type="text" name="question_text" value="<?php echo $question->text;?>"></p><br>
		<p>Question points: <input class="form-control" type="text" name="points" value="<?php echo $question->points;?>"></p><br>
		<h3>Answers:</h3><br>
		<?php
			foreach($answers as $answer){
					$one_selected = "";
					$zero_selected = "";
					if($answer->correct == 1){
						$one_selected = "selected='selected'";
					} else {
						$zero_selected = "selected='selected'";
					}
				?>
				<div class="row">
				<div class="col-lg-6">
					<input type="text" name="answer_texts[]" class="form-control" value="<?php echo $answer->text; ?>">
					<input type="hidden" name="answer_ids[]"  value="<?php echo $answer->id; ?>">
				</div>
				<div class="col-lg-2">
					<select name="answer_corrects[]" class="form-control">
						<option value="1" <?php echo $one_selected; ?>>True</option>
						<option value="0" <?php echo $zero_selected; ?>>False</option>
					</select><br>
				</div>
				</div>
				
				<?php
			}
		?>
		<div id="back"  class="btn btn-default"><a href="device_questions.php?id=<?php echo $_REQUEST["device_id"]; ?>">Back</a></div> <input type="submit" value="Update" class="btn btn-info"> 
	</form>
	</section>
</body>
</html>