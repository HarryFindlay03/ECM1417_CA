<html lang="en">
<?php session_start() ?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Play Tetris</title>
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
        $_SESSION["database"] = false;
        if(!isset($_SESSION["use"])) {
            header("Location: index.php?not_logged_in");
        }
        ?>
        <div id="score">
            <p id="scoreTag">Score: </p>
        </div>
        <div id="tetris-bg">
            <button onclick="startTetris(this)" id="start-btn">Start Game!</button>
        </div>
    </div>
    <script src="tetris.js"></script>
</body>
</html>