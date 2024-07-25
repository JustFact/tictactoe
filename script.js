/*
Goal: No code in global scope
Using Vanilla javaScript:
Factory Functions
IIFE module pattern


Game starts
board is empty
player 1 takes turn $ loop1
player 2 takes turn $ loop1
$ check if any match-3-line happens (while board might be partially empty)
players fill up the board
either a player win or a draw happens
*/

const game = (function(){
    const gameBoard = (function(){  //Complete game will only have one gameBoard
        const board = ['','','','','','','','',''];
        const getMark = (index) => board[index];
        const setMark = (index,mark) => board[index] = mark;
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
            } else if(board.length === 9 && !board.includes(undefined)){
                return 'draw'
            }
        }
        return {getMark, setMark, checkGame}
    })()
    
    const display = (function(){
        //Make a display controllers
        const cells = document.querySelectorAll(".cell");
        const update = () => {
            for(let i = 0; i<9; i++){
                cells[i].innerText = gameBoard.getMark(i);
            }
        }
        return {update}
    })();

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

        let playerOneTurn = true;
        const playerInput = document.querySelector("#playerInput")
        const submitButton = document.querySelector("#submitButton")

        submitButton.addEventListener('click',(e)=>{
            e.preventDefault();
            inputIndex = Number.parseInt(playerInput.value);
            playerInput.value = '';
            if(!gameBoard.checkGame()){
                if(playerOneTurn){
                    let indx = inputIndex;
                    playTurn(playerOne,indx);
                    playerOneTurn = false;
                    display.update()
                } else {
                    let indx = inputIndex;
                    playTurn(playerTwo,indx);
                    playerOneTurn = true;
                    display.update();
                }
                console.log("Check game: "+gameBoard.checkGame());
                if(gameBoard.checkGame() != ''){
                    console.log('Game Over')
                }
            }
        })
    }

    function playTurn(player,index){
        if(gameBoard.getMark(index) == ''){
            gameBoard.setMark(index,player.mark);
        }else {
            console.log("Not Allowed")
        }
        displayBoardConsole()
    }

    function displayBoardConsole(){
        for(let i = 0; i<9; i = i+3){
            console.log(gameBoard.getMark(i+0),gameBoard.getMark(i+1),gameBoard.getMark(i+2));
        }
    }

    function start(){
        display.update();
        const playerOne = Player('First','O');
        const playerTwo = Player('Second','X');
        displayBoardConsole();
        playRound(playerOne,playerTwo);
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