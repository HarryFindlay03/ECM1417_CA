//always spawn in middle
var startX = 4;
var startY = 0;

var score = 0;

//boolean to check when to play the music
var first = true;
var audio = new Audio('soundtrack.mp3');
audio.loop = true;

var tetrisBoard = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
];

//tetrisBg is the image on the html
var tetrisBg = document.getElementById("tetris-bg");

//score div
var scoreDiv = document.getElementById("score");

//containerDiv for all tempDivs
var currentPiece;

//currentBlock stores just the coords of the currentBlock
var currentBlock;

//currentBlockLetter stores just the string value of the current Letter that has been selected
var currentBlockLetter;

//intervalId
var refreshIntervalId;

//button on the bg
var startBtn = document.getElementById("start-btn");

function startTetris(btn) {
    btn.style.display = 'none';
    scoreDiv.style.display = "block";

    //play the music
    if(first == true) {
        first = false;
        audio.play();
    }

    createBlock();
    if(checkSpawn()) {
        score++;
        document.getElementById("scoreTag").innerHTML = `Score: ${score}`;
        draw();
        refreshIntervalId = setInterval(function() {moveDown()}, 1000);
    } else {
        endGame();
    }
}

function createBlock() {
    var pieces = {
        "L": [[1, 1], [1, 2], [1, 3], [2, 3]],
        "Z": [[1, 1], [2, 1], [2, 2], [3, 2]],
        "S": [[1, 2], [2, 1], [2, 2], [3, 1]],
        "T": [[1, 1], [2, 1], [2, 2], [3, 1]],
        "O": [[1, 1], [1, 2], [2, 1], [2, 2]],
        "I": [[1, 1], [1, 2], [1, 3], [1, 4]]
    };

    let ranPieceNum = Math.floor(Math.random() * 6);

    switch(ranPieceNum) {
        case 0:
            currentBlock = pieces["L"];
            currentBlockLetter = "L";
            break;
        case 1:
            currentBlock = pieces["Z"];
            currentBlockLetter = "Z";
            break;
        case 2:
            currentBlock = pieces["S"];
            currentBlockLetter = "S";
            break;
        case 3:
            currentBlock = pieces["T"];
            currentBlockLetter = "T";
            break;
        case 4:
            currentBlock = pieces["O"];
            currentBlockLetter = "O";
            break;
        case 5:
            currentBlock = pieces["I"];
            currentBlockLetter = "I";
            break;
    }

    currentPiece = document.createElement("div");
    tetrisBg.appendChild(currentPiece);
}

function draw() {
    //add coords into the tetrisBoard
    //go through all the coords
    for(let i = 0; i < currentBlock.length; i++) {
        //[y][x]
        tetrisBoard[currentBlock[i][1]-1 + startY][currentBlock[i][0]-1 + startX] = currentBlockLetter;

        var tempDiv = document.createElement("div");
        tempDiv.setAttribute("id", currentBlockLetter);
        tempDiv.setAttribute("class", "block");

        //translate(x, y);
        //x: (currentBlock[i][0]-1)
        //y: (currentBlock[i][1]-1)
        tempDiv.style.transform = `translate(${((currentBlock[i][0]-1) + startX) * 30}px, ${((currentBlock[i][1]-1) + startY) * 30}px )`;

        currentPiece.appendChild(tempDiv);
        
    }
}

function checkCollisions(pos) {
    for(let y = 0; y < 20; y++) {
        for(let x = 0; x < 10; x++) {
            if(tetrisBoard[y][x] == currentBlockLetter) {
                switch(pos) {
                    case "L":
                        if(x == 0) {
                            return false;
                        }
                        if(tetrisBoard[y][x-1] == "set") {
                            return false;
                        }
                        break;
                    case "R":
                        if(x == 9) {
                            return false;
                        }
                        if(tetrisBoard[y][x+1] == "set") {
                            return false;
                        }
                        break;
                    case "B":
                        //get the bottom coords
                        if(y == 19) {
                            return false;
                        }
                        if(tetrisBoard[y+1][x] == "set") {
                            return false;
                        }
                        break;
                }
            }
        }
    }
    return true;
}

function checkSpawn() {
    for(let i = 0; i < currentBlock.length; i++) {
        if(tetrisBoard[currentBlock[i][1]-1 + startY][currentBlock[i][0]-1 + startX] == "set") {
            return false;
        }
    }
    return true;
}

function checkRow() {
    let i = 0;
    var rows = [];
    var row = false;
    for(let y = 0; y < 20; y++) {
        for(let x = 0; x < 10; x++) {
            if(tetrisBoard[y][x] == "set") {
                row = true;
            } else {
                //gap has been found
                row = false;
                break;
            }
        }
        if(row == true) {
            rows[i] = y;
            i++;
        }
    }
    return rows;
}

function clearRow(row) {
    var divs = document.getElementsByClassName(row);
    while (divs.length > 0) {
        divs[0].parentNode.removeChild(divs[0]);
    }

    for(let x = 0; x < 10; x++) {
        tetrisBoard[row][x] = "";
    }

    for(let y = row-1; y > 0; y--) {
        var divs = document.getElementsByClassName(y);
        console.log(`Row: ${y}    Number of Divs: ${divs.length}`);
        for(let i = 0; i < divs.length; i++) {
            console.log(divs[i].style.transform);
            var xVal = divs[i].style.transform.split(",")[0].split("(")[1].split("p")[0];
            divs[i].style.transform = `translate(${xVal}px, ${(y*30)+30}px)`;
            console.log(divs[i].style.transform);
        }
        for(let x = 0; x < 10; x++) {
            if(tetrisBoard[y][x] == "set") {
                tetrisBoard[y][x] = "";
                tetrisBoard[y+1][x] = "set";
            }
        }
        //CHANGE THE CLASS NAMES
        while(divs.length) {
            divs[0].className = y+1;
        }
    }
} 

function clear() {
    for(let y = 0; y < 20; y++) {
        for(let x = 0; x < 10; x++) {
            if(tetrisBoard[y][x] == currentBlockLetter) {
                tetrisBoard[y][x] = "";
            }
        }
    }

    while(currentPiece.hasChildNodes()) {
        currentPiece.removeChild(currentPiece.lastChild);
    }
}

function endGame() {
    clearInterval(refreshIntervalId);
    audio.pause();

    var form = document.createElement("form");
    var scoreElem = document.createElement("input");  

    form.method = "POST";
    form.action = "leaderboard.php";   

    scoreElem.value = score;
    scoreElem.name = "score";
    form.appendChild(scoreElem);  

    document.body.appendChild(form);
    
    form.submit();
}

//CHECKING KEY PRESSES
document.addEventListener('keydown', function(event) {
    const key = event.key;

    switch(event.key) {
        case "ArrowLeft":
            console.log("left");
            moveLeft();
            break;
        case "ArrowRight":
            console.log("right");
            moveRight();
            break;
        case "ArrowDown":
            //Stopping scrolling
            event.preventDefault();
            moveDown();
            console.log("down");
            break;
        case "ArrowUp":
            //Stopping scrolling
            event.preventDefault();
            rotate();
            console.log("up");
            break;
        case " ":
            event.preventDefault();
            moveToBottom();
            console.log("space");
    }
});

function moveToBottom() {
    while(checkCollisions("B")) {
        moveDown();
    }
}

function moveDown() {
    if(checkCollisions("B")) {
        startY += 1;
        clear();
        draw();
    } else {
        clearInterval(refreshIntervalId);
        //setting in the 2d array
        //setting the class of the divs to the position that they are
        let i = 0;
        var tempDivs = currentPiece.children;
        for(let y = 0; y < 20; y++) {
            for(let x = 0; x < 10; x++) {
                if(tetrisBoard[y][x] == currentBlockLetter) {
                    //only ever be checked 4 times
                    tetrisBoard[y][x] = "set"; 

                    //var yVal = tempDivs[i].style.transform.split(",")[1].split("px")[0]; //translate(120px, 540px) -> 540
                    //tempDivs[i].setAttribute('class', (yVal / 30));
                    tempDivs[i].setAttribute('class', ((currentBlock[i][1]-1) + startY));
                    i++;
                }
            }
        }
        
        //remove rows
        var fullRows = checkRow();
        console.log("full rows");
        console.log(fullRows);

        for(let j = 0; j < fullRows.length; j++) {
            clearRow(fullRows[j]);
        }
        
        console.log(tetrisBoard);
        //always spawn in middle
        startX = 4;
        startY = 0;
        startTetris(startBtn);
    }
}

function moveRight() {
    if(checkCollisions("R")) {
        startX += 1;
        clear();
        draw();
    } 
}

function moveLeft() {
    if(checkCollisions("L")) {
        startX -= 1;
        clear();
        draw();
    }
}

function rotate() {
    if(currentBlockLetter == "O") {
        clear();
        draw();
    } else {
        var pointOfRotation;
        var ignore;
        //get the pointOfRotation
        switch(currentBlockLetter) {
            case "L":
                pointOfRotation = currentBlock[1];
                ignore = 1;
                break;
            case "Z":
                pointOfRotation = currentBlock[2];
                ignore = 2;
                break;
            case "S":
                pointOfRotation = currentBlock[2];
                ignore = 2;
                break;
            case "T":
                pointOfRotation = currentBlock[2];
                ignore = 2;
                break;
            case "I":
                pointOfRotation = currentBlock[1];
                ignore = 1;
                break;
        }

        for(let i = 0; i < currentBlock.length; i++) {
            //if the block is not the block you are rotating around
            if(i !== ignore) {
                //translate to origin
                currentBlock[i][0] -= pointOfRotation[0];
                currentBlock[i][1] -= pointOfRotation[1];

                //rotate around origin
                var temp = currentBlock[i][0]
                currentBlock[i][0] = currentBlock[i][1];
                currentBlock[i][1] = -(temp);

                //translate back
                currentBlock[i][0] += pointOfRotation[0];
                currentBlock[i][1] += pointOfRotation[1];
            }
        }
        if(checkCollisions("L") && checkCollisions("R")) {
            if(!checkCollisions("B")) {
                moveDown();
            }
            clear();
            draw();
        }
    }
}
