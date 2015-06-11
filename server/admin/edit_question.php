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
</head>
<body>
	<div id="back"><a href="device_questions.php?id=<?php echo $_REQUEST["device_id"]; ?>">Back</a></div>
	
	<?php
		$question = getQuestionInfo($_REQUEST["id"]);
		$answers = getAnswers($_REQUEST["id"]);
	?>
	
	<form action="update_question.php" method="post">
		Question:<br>
		<input type="hidden" name="question_id" value="<?php echo $_REQUEST["id"]; ?>">
		<input type="text" name="question_text" value="<?php echo $question->text;?>"><br>
		<input type="text" name="points" value="<?php echo $question->points;?>"><br><br>
		Answers:<br>
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
				
					<input type="text" name="answer_texts[]" value="<?php echo $answer->text; ?>">
					<input type="hidden" name="answer_ids[]" value="<?php echo $answer->id; ?>">
					<select name="answer_corrects[]">
						<option value="1" <?php echo $one_selected; ?>>True</option>
						<option value="0" <?php echo $zero_selected; ?>>False</option>
					</select><br>
				
				<?php
			}
		?>
		<input type="submit" value="Update"> 
	</form>
	
</body>
</html>