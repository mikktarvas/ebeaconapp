<?php
	/*
	 * @author: Kardo Jõeleht
	 */
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Museum Race Login</title>
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
	<div id="login" class="container form-signin">
		<div class="jumbotron">
			<h2 class="form-signin-heading">Log in</h2>
				<form action="login.php" method="post" >
					<input type="text" name="username" placeholder="Username" class="form-control" ><br>
					<input type="password" name="password" placeholder="Password" class="form-control" ><br>
					<input type="submit" value="Login" class="btn btn-lg btn-default btn-block">
				</form>
		</div>
	</div>
</body>
</html>