
const gameBoard = (() => {
    let boardArray = ["U","U","U","U","U","U","U","U","U"];
    let started=false;

    const spotOpen = (position) => {
        (boardArray[position] == "U") ? true : false;
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

    return {
        spotOpen,
        makeMove,
        toggleBoard,
        boardOn,
        querySpot,
    };

})();

const playerFactory = (playerName,marker,firstMove) => {
    return {playerName, marker, firstMove};
};

const displayControl = (() => {
    let currentMarker;
    let xPlayer;
    let oPlayer;

    const places=document.querySelectorAll("place");

    const spots=document.querySelectorAll("spot");
    spots.forEach(item => {
        item.addEventListener("click", handleMove);
    });

    const markerToggle = () => {
        currentMarker = (currentMarker == "X") ? "O" : "X";
    };

    const handleMove = (e) => {
        let index=e.target.getAttribute("data-key");
        if (!gameBoard.boardOn()) { return };
        if (!gameBoard.spotOpen(index)) { return };
        gameBoard.makeMove(index,currentMarker);
        renderBoard();
        e.target.classList.toggle("hidden");
        markerToggle();
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
            if ((a==b) && (b==c)) {
                endGame("win",a);
                return;
            }
        })
    }

    const checkForTie = () => {
        for (let i = 0; i < 9; i++) {
            if (gameBoard.querySpot(i) == "U") { return }
          };
        endGame("tie"); 
    }

    const endGame = (outcome,marker) => {

    }
    
    const startGame = () => {

    }

})();