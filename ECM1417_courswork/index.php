<html lang="en">
<?php session_start() ?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
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
            <?php
                //Not logged in and trying to play.
                if(isset($_GET["not_logged_in"])) {
                    echo "YOU NEED TO LOG IN TO PLAY! <br>";
                }
                if(isset($_POST["register-btn"])) {
                    //Logged in
                    $fname = $_POST["fname"];
                    $lname = $_POST["lname"];
                    $uname = $_POST["uname"];
                    $passwd = $_POST["password"];
                    $display = $_POST["display"];
    
                    $error = false;
    
                    if(empty($fname)) {
                        $error = true;
                        echo "First name not set! <br>";
                    }
                    if(empty($lname)) {
                        echo "Last name not set! <br>";
                    }
                    if (!preg_match("/^[a-zA-Z ]*$/",$fname)) {
                        $error=true;
                        echo "First name should only contain letters and whitespace <br>";
                    }
                    if (!preg_match("/^[a-zA-Z ]*$/",$lname)) {
                        $error=true;
                        echo "Last name should only contain letters and whitespace <br>";
                    }
                    if(empty($uname)) {
                        $error = true;
                        echo "Username is empty! <br>";
                    }
                    if(empty($passwd)) {
                        $error=true;
                        echo "Password not set! <br>";
                    }
                    if (strlen($passwd)<5) {
                        $error=true;
                        echo "Password too short! <br>";
                    }
                    if (!preg_match("/[\*\#\+\-\£\@\!\&]+/",$passwd)) {
                        $error=true;
                        echo "Password must have at least one special character! <br>";
                    }
                    if (!preg_match("/[a-z]+/",$passwd) or !preg_match("/[A-Z]+/",$passwd)) {
                        $error=true;
                        echo "Password must have at least one lower case letter and one upper case letter! <br>";
                    }
                    if (preg_match("/[ ]+/",$passwd)) {
                        $error=true;
                        echo "Password must not contain whitespaces! <br>";
                    }
                    if($passwd != $_POST["confirmpassword"]) {
                        $error = true;
                        echo "Passwords need to be the same! <br>";
                    }
                    if(empty($display)) {
                        $error = true;
                        echo "Need to choose a display!";
                    }
                    if($error) {
                        echo "CLICK REGISTER TO TRY AGAIN!";
                    }
                    if(!$error) {
                        //REGISTER WAS SUCCESFULL, CONNECT TO DATABASE AND SUBMIT INTO USERS

                        $db_username = "ecm1417";
                        $db_password = "WebDev2021";
                        $dbname = "tetris";

                        $conn = mysqli_connect("localhost", $db_username, $db_password, $dbname);

                        if(!$conn) {
                            die("Connection failed: " . mysqli_connect_error());
                        }

                        //Checking display radio value
                        if($display == "yes") {
                            $display = 1;
                        } else {
                            $display = 0;
                        }

                        //Hash password
                        $hash = password_hash($passwd, PASSWORD_DEFAULT);

                        $sql = "INSERT INTO Users VALUES ('" . $uname . "', '" . $fname . "', '" . $lname . "', '" . $hash . "', '" . $display . "');";

                        if(mysqli_query($conn, $sql)) {
                            //Setting the session variable
                            $_SESSION["use"] = true;
                            $_SESSION["username"] = $uname;
                            echo "REGISTER WAS SUCCESSFUL! <br>";
                        } else {
                            echo "Error: ". mysqli_error($conn);
                        }
            
                        mysqli_close($conn);
                    }                  
                }
            ?>

            <?php if(!isset($_SESSION["use"])) :?>
                <h1>Welcome to Tetris</h1>
                <form action="index.php" method="post">
                    <label for="uname">Username:</label>
                    <input type="text" name="login-uname" placeholder="Enter Username"> <br>
                    <label for="passowrd">Password:</label>
                    <input type="password" name="login-password" placeholder="Enter Password"> <br>
                    <input type="submit" value="Log In" name="login-btn">
                </form>
                
                <?php
                    //CHECKING LOGIN
                    if(isset($_POST["login-btn"])) {
                        $db_username = "ecm1417";
                        $db_password = "WebDev2021";
                        $dbname = "tetris";

                        $conn = mysqli_connect("localhost", $db_username, $db_password, $dbname);

                        if(!$conn) {
                            die("Connection failed: " . mysqli_connect_error());
                        }

                        $input_uname = $_POST["login-uname"];
                        $input_password = $_POST["login-password"];

                        //Password verify hashed password from database

                        $sql = "SELECT Password FROM Users WHERE Username = " . "'" . $input_uname . "';";

                        $query = mysqli_query($conn, $sql);

                        if(!$query) {
                            echo "Error: " . mysqli_error($conn);
                        } else {
                            //Get the password hash from the db
                            $row = mysqli_fetch_assoc($query);
                            if($row) {
                                if(password_verify($input_password, $row["Password"])) {
                                    //Login successul
                                    $_SESSION["use"] = true;
                                    $_SESSION["username"] = $input_uname;
                                    header("Location: index.php");
                                } else {
                                    //Password incorrect
                                    echo "USERNAME OR PASSWORD INCORRECT!";
                                }
                            } else {
                                echo "USERNAME OR PASSWORD INCORRECT!";
                            }
                        }
                    }
                ?>

                <p>Don't have a user account? <a href="register.php">Register now</a></p>
            <?php else :?>
                <h1>Welcome to Tetris</h1>
                <form action="tetris.php">
                    <input type="submit" name="play-tetris" value="Click here to play!">
                </form>
                <br>
                <br>
                <form action="index.php" method="post">
                    <input type="submit" name="logout" value="logout">
                </form>
            <?php endif; ?>

            <?php 
            if(isset($_POST["logout"])) {
                session_destroy();
                header("Location: index.php");
            }
            ?>

        </div>
    </div>
</body>
</html>