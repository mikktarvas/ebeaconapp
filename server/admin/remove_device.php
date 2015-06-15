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
</head>
<body>
	<div id="back"><a href="main.php">Back</a></div>
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
</body>
</html>