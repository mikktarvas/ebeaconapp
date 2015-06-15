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
	<script src="script.js"></script>
</head>
<body>
	<h3>Beacon: <?php echo getBeaconNameById($_REQUEST["device_id"]); ?></h3>
	<div id="back"><a href="device_questions.php?id=<?php echo $_REQUEST["device_id"]; ?>">Back</a></div>
	
	<form action="update_question.php" method="post">
		Question:<br>
		<input type="hidden" name="add_new_question">
		<input type="hidden" name="device_id" value="<?php echo $_REQUEST["device_id"]; ?>">
		<input type="text" placeholder="Question text" name="question_text"><br>
		<input type="text" placeholder="Points" name="points"><br><br>
		Answers:<br>
		<div id="answer_container">
			<div class="answer">
				<input type="text" placeholder="Answer text" name="answer_texts[]">
				<select name="answer_corrects[]">
					<option value="1" selected="selected">True</option>
					<option value="0">False</option>
				</select>
			</div>
		</div>
		<a href="#" id="answer_adder">Add answer</a><br>
		<input type="submit" value="Save">
	</form>
	
</body>
</html>