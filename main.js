
const gameBoard = (() => {
    let boardArray = ["U","U","U","U","U","U","U","U","U"];
    let started=false;

    const spotOpen = (position) => {
        let returnValue = (boardArray[position] == "U") ? true : false;
        return returnValue;
    };

    const makeMove = (position, marker) => {
        boardArray.splice(position, 1, marker);
    };

    const toggleBoard = () => {
        started = (started) ? false : true;
    };

    const boardOn = () => {
        return started;
    }

    const querySpot = (position) => {
        return boardArray[position];
    }

    const resetBoard = () => {
        boardArray = ["U","U","U","U","U","U","U","U","U"];
    }

    const logBoard = () => {
        console.log(boardArray);
    }

    return {
        spotOpen,
        makeMove,
        toggleBoard,
        boardOn,
        querySpot,
        resetBoard,
        logBoard
    };

})();

const players = (() => {
    let playerArray = [];

    const playerFactory = (playerNumber, playerName,marker,firstMove) => {
        playerArray.push({playerNumber, playerName, marker, firstMove});
    };

    const whichPlayer = (markerQuery) => {
        let output;
        playerArray.forEach((player) => {
            if (player.marker==markerQuery) {
                output = player.playerName;
            };
        });
        return output;
    }
    
    const logPlayers = () => {
        console.log(playerArray);
    }

    return {
        playerFactory,
        whichPlayer,
        logPlayers
    }
})();



const displayControl = (() => {
    let currentMarker;
    const status=document.querySelector(".status");
    const places=document.querySelectorAll(".place");
    const spots=document.querySelectorAll(".spot");
 
    const setBoard = () => {
        spots.forEach(item => {
             item.addEventListener("click", handleMove);
        });
    };

    const markerToggle = () => {
        currentMarker = (currentMarker == "X") ? "O" : "X";
    };

    const handleMove = (e) => {
        let index=e.target.getAttribute("data-index");
        if (!gameBoard.boardOn()) { 
            console.log("Board not on")
            return 
        };
        if (!gameBoard.spotOpen(index)) { 
            console.log("spot not open")
            return 
        };
        gameBoard.makeMove(index,currentMarker);
        renderBoard();
        markerToggle();

        let element = e.target.querySelector(".place");
        if (element) {
            element.classList.toggle("hidden");
        }

    }

    const renderBoard = () => {
        let i=0;
        places.forEach(item => {
            item.innerHTML = gameBoard.querySpot(i);
            i++;
        })
        checkForWin();
        checkForTie();
    }

    const checkForWin = () => {
        let winArr = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        winArr.forEach(combo => {
            let a = gameBoard.querySpot(combo[0]);
            let b = gameBoard.querySpot(combo[1]);
            let c = gameBoard.querySpot(combo[2]);
            if (((a==b) && (b==c))&& a!=="U") {
                endGame("win",a);
                return;
            }
        })
    }

    const checkForTie = () => {
        for (let i = 0; i < 9; i++) {
            if (gameBoard.querySpot(i) == "U") { return }
          };
        endGame("tie",""); 
    }

    const endGame = (outcome,marker) => {
        let winner=(marker=="X") ? players.whichPlayer("X") : players.whichPlayer("O");
        let message="The game is a tie.";
        gameBoard.toggleBoard();
        if (outcome=="win") {
            message=`${winner} wins!`
        }
        status.innerHTML = message;
    }

    const displayRadioValue = (name) => {
        let ele = document.getElementsByName(name);
          
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked)
                return ele[i].value;
        }
    }

    const otherMarker = (marker) => {
        let newMarker = (marker=="X") ? "O" : "X";
        return newMarker;
    }

    const isGoingFirst = (player) => {
        if (player==displayRadioValue("first")) {
            return true;
        } else {
            return false;
        }
    }

    const getsMarker = (first)  => {
        if (first) {
            return currentMarker
        } else {
            return otherMarker(currentMarker);
        }
    }


    const startGame = () => {
        const playerOneName = document.getElementById("player1-name").value;
        const playerTwoName = document.getElementById("player2-name").value;
        let playerOneFirst = isGoingFirst("Player One");
        let playerTwoFirst = isGoingFirst("Player Two");

        currentMarker=displayRadioValue("marker-choice");

        players.playerFactory(1,playerOneName,getsMarker(playerOneFirst),playerOneFirst);
        players.playerFactory(2,playerTwoName,getsMarker(playerTwoFirst),playerTwoFirst);

        setBoard();
        gameBoard.toggleBoard();

        console.log("Game started");

    }

    return {
        startGame
    }

})();