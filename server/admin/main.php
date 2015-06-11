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
</head>
<body>
	<div id="logout"><a href="logout.php">Logout</a></div>
	
	<?php
		// Get all devices and
		$devices = getAllDevices();
		foreach($devices as $device){
			echo "<div class='device'>{$device->name} ({$device->uuid}) | <a href='device_questions.php?id={$device->id}'>Show questions</a> | <a href='remove_device.php?id={$device->id}'>Remove device</a> </div>";
		}
	?>
	
	<div id="add_devices"><a href="add_device.php">Add a device</a></div>
	
</body>
</html>