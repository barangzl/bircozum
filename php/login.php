<?php
session_start();

require_once "../php/connect.php";


//check if data from form is submitted to php
if ( !isset($_POST['username'], $_POST['password']) ) {
	//data is not submitted
	exit('Please fill both the username and password fields!');
}

//preparing the SQL statement will prevent SQL injection
if ($stmt = $con->prepare('SELECT userID, username, password FROM accounts WHERE username = ?')) {
	$stmt->bind_param('s', $_POST['username']);
	$stmt->execute();
	//store the result to check if it exists in the database
	$stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($userID, $username, $password);
        $stmt->fetch();
        // Account exists, now we verify the password.
        // Note: remember to use password_hash in your registration file to store the hashed passwords.
        $hash = md5($_POST['password']);
        if ($password === $hash) {
            // password_verify($_POST['password'], $password) -->> requires password_hash() to create passwords
            // Verification success! User has logged-in!
            // Create sessions, so we know the user is logged in, they basically act like cookies but remember the data on the server.
            session_regenerate_id();
            $_SESSION['loggedin'] = TRUE;
            $_SESSION['name'] = $_POST['username'];
            $_SESSION['id'] = $userID;
            header("Location: ../index.php");
        } else {
            // Incorrect password
            echo 'Incorrect password!';
        }
    } else {
        // Incorrect username
        echo 'Incorrect username ';
    }
	$stmt->close();
}

?>