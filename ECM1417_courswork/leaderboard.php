<html lang="en">
<?php session_start()?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
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
        <?php
            //connect to db
            $db_username = "ecm1417";
            $db_password = "WebDev2021";
            $dbname = "tetris";

            $conn = mysqli_connect("localhost", $db_username, $db_password, $dbname);

            if(!$conn) {
                die("Connection failed: " . mysqli_connect_error());
            }

            if(isset($_POST["score"]) and $_SESSION["database"] == false) {
                //input into database
                //username saved in session variable
                $username = $_SESSION["username"];
                $score = $_POST["score"];

                $sql_display = "SELECT Display FROM Users WHERE Username = '" . $username . "';";

                $query = mysqli_query($conn, $sql_display);

                $display = 0;

                if(!$query) {
                    echo "Error: " . mysqli_error($conn);
                } else {
                    $display = $query->fetch_assoc();
                }

                if($display["Display"] == 1) {
                    $sql = "INSERT INTO Scores (Username, Score) VALUES ('" . $username . "', '" . $score . "');"; 
                    if(mysqli_query($conn, $sql)) {
                       $_SESSION["database"] = true; 
                    } else {
                        echo "Error: ". mysqli_error($conn);
                    }

                } 
                
            }

            //for loop and show table with scores

            $sql = "SELECT Username, Score FROM Scores ORDER BY Score DESC;";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo "<table><tr><th>Username</th><th>Score</th></tr>";
                // output data of each row
                while($row = $result->fetch_assoc()) {
                    echo "<tr><td>".$row["Username"]."</td><td>".$row["Score"]."</td></tr>";
                
                }
                echo "</table>";
            } else {
                echo "<table><tr><th>Username</th><th>Score</th></tr></table>";
            }
            
            mysqli_close($conn);
        ?>
    </div>
</body>
</html>