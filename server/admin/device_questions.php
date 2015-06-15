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
</head>
<body>
	<div id="back"><a href="main.php">Back</a></div>
	<?php
		$questions = getDeviceQuestions($_REQUEST["id"]);
		foreach($questions as $question){
			echo "<div class='question'>{$question->text} | <a href='edit_question.php?id={$question->id}&device_id={$_REQUEST["id"]}'>Edit question</a> | <a href='remove_question.php?id={$question->id}' class='delete_confirm'>Remove question</a></div>";
		}
	?>
	<div id="add_questions"><a href="add_question.php?device_id=<?php echo $_REQUEST["id"]; ?>">Add a question</a></div>
</body>
</html>