
const gameBoard = (() => {
    let boardArray = ["U","U","U","U","U","U","U","U","U"];

    const spotOpen = (position) => {
        (boardArray[position] == "U") ? true : false;
    };

    const makeMove = (position, marker) => {
        boardArray.splice(position, 1, marker);
    };
    
    return {
        spotOpen,
        makeMove
    };

})();

const playerFactory = (playerName,marker,firstMove) => {
    return {playerName, marker, firstMove};
};

