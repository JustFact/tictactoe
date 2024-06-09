/*
Goal: No code in global scope
Using Vanilla javaScript:
Factory Functions
IIFE module pattern
*/

const game = (function(){
    const gameBoard = (function(){  //Complete game will only have one gameBoard
        const board = [
            0,0,0,
            0,0,0,
            0,0,0,
        ];
        const getMark = (index) => board[index];
        const setMark = (index,mark) => board[index-1] = mark;
        return {getMark, setMark}      
    })()
    
    function Player(name,mark){
        this.mark = mark;
        return {name,mark}
    }

    function playRound(playerOne,playerTwo){
        if(!playerOne.name && !playerTwo.name){
            playerOne.name = prompt("Player one name");
            playerTwo.name = prompt("Player two name");
        }
        console.log(`player one: ${playerOne.name} and player two:${playerTwo.name}`);
        //make a loop that let players play their turns and check the win condition simultaneously
        gameBoard.setMark(5,playerOne.mark);        //Temporary line
        gameBoard.setMark(9,playerTwo.mark);        //Temporary line
    }

    function displayBoardConsole(){
        for(let i = 0; i<9; i = i+3){
            console.log(gameBoard.getMark(i+0),gameBoard.getMark(i+1),gameBoard.getMark(i+2));
        }
    }

    function start(){
        const playerOne = Player('First','O');
        const playerTwo = Player('Second','X');
        playRound(playerOne,playerTwo);
        displayBoardConsole();
    }

    return {start}
})();

game.start();

/*
TODO:
Player1,Player2
win condition
draw condition
gameplay function
*/