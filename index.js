const gameBoard = document.getElementById("gameBoard");
let gameLock = false;

const debugMode = false;
createGrid();

function createGrid() {
    gameLock = false;
    gameBoard.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        newRow = gameBoard.insertRow(i);
        for (var j = 0; j < 10; j++) {
            newCell = newRow.insertCell(j);
            newCell.onclick = function () { startGame(this); };
            mineAttribute = document.createAttribute("mine");
            mineAttribute.value = "false";
            newCell.setAttributeNode(mineAttribute);
        }
    }
    placeMines();
}

function placeMines() {
    for (var i = 0; i < 20; i++) {
        randomRow = Math.floor(Math.random() * 10);
        randomCol = Math.floor(Math.random() * 10);
        mineCell = gameBoard.rows[randomRow].cells[randomCol];
        mineCell.setAttribute("mine", "true");
        if (debugMode) {
            mineCell.innerHTML = "X";
        }
    }
}

function showMines() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            currentCell = gameBoard.rows[i].cells[j];
            if (currentCell.getAttribute("mine") == "true") {
                currentCell.className = "mine";
            }
        }
    }
}

function isGameFinished() {
    var gameFinished = true;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if ((gameBoard.rows[i].cells[j].getAttribute("mine") == "false") && (gameBoard.rows[i].cells[j].className == "" || gameBoard.rows[i].cells[j].className == "checked")) {
                gameFinished = false;
            }
        }
    }
    if (gameFinished) {
        alert("You Found All Mines!");
        showMines();
    }
}

function startGame(clickedCell) {
    if (gameLock) {
        return;
    } else {
        if (clickedCell.getAttribute("mine") == "true") {
            showMines();
            gameLock = true;
        } else {
            var nearbyMineCount = 0;
            cellRowIdx = clickedCell.parentNode.rowIndex;
            cellColIdx = clickedCell.cellIndex;
            for (var i = Math.max(cellRowIdx - 1, 0); i <= Math.min(cellRowIdx + 1, 9); i++) {
                for (var j = Math.max(cellColIdx - 1, 0); j <= Math.min(cellColIdx + 1, 9); j++) {
                    if (gameBoard.rows[i].cells[j].getAttribute("mine") == "true") {
                        nearbyMineCount++;
                    }
                }
            }
            clickedCell.className = "active";
            clickedCell.innerHTML = nearbyMineCount;
            isGameFinished();
        }
    }
}

