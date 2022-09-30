<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="navbar">
        <a href="index.php" name="home">Home</a>
        <div class="navbar-right">
            <a href="tetris.php" name="tetris">Play Tetris</a>
            <a href="leaderboard.php" name="leaderboard">Leaderboard</a>
        </div>
    </div>
    <div class="main">
        <div>
            <?php //TODO GET REQUESTS FOR VALIDATION ON REGISTER PAGE USING "?error=<msg>"
            ?>
            <form action="index.php" method="post">
                First Name: <input type="text" placeholder="First Name" name="fname"> <br>
                Last Name: <input type="text" placeholder="Last Name" name="lname"> <br>
                Username: <input type="text" placeholder="Username" name="uname"> <br>
                Password: <input type="password" placeholder="Password" name="password"> <br>
                Confirm Password: <input type="password" placeholder="Confirm Password" name="confirmpassword"> <br>
                Display scores on leaderboard: 
                Yes: <input type="radio" name="display" value="yes">
                No: <input type="radio" name="display" value="no"><br>
                <input type="submit" value="Register" name="register-btn">
            </form>

        </div>
        
    </div>
</body>
</html>
