/*
Goal: No code in global scope
Using Vanilla javaScript:
Factory Functions
IIFE module pattern
*/

const game = (function(){
    const gameBoard = (function(){  //Complete game will only have one gameBoard
        const board = [];
        const getMark = (index) => board[index];
        const setMark = (index,mark) => board[index-1] = mark;
        const checkGame = () =>{
            /*
            0,1,2,
            3,4,5,
            6,7,8,
            */
            if(board[0]===board[1] && board[1]===board[2]){         //horizontal 1
                return board[0];
            } else if(board[3]===board[4] && board[4]===board[5]){  //second horizontal
                return board[3];
            } else if(board[6]===board[7] && board[7]===board[8]){  //third horizontal
                return board[6];
            } else if(board[0]===board[3] && board[3]===board[6]){  //first vertical
                return board[0];
            } else if(board[1]===board[4] && board[4]===board[7]){  //second vertical
                return board[1];
            } else if(board[2]===board[5] && board[5]===board[8]){  //third vertical
                return board[2];
            } else if(board[0]===board[4] && board[4]===board[8]){  //first diagonal
                return board[0];
            } else if(board[2]===board[4] && board[4]===board[6]){  //second diagonal
                return board[2];
            } else {
                return 'draw'
            }
        }
        return {getMark, setMark, checkGame}
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