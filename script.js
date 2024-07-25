/*
Goal: No code in global scope
Using Vanilla javaScript:
Factory Functions
IIFE module pattern

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
            } else if(board.length === 9 && !board.includes('')){
                return 'draw'
            }
        }
        return {getMark, setMark, checkGame}
    })()
    
    const display = (function(){
        const cells = document.querySelectorAll(".cell");
        const update = () => {
            for(let i = 0; i<9; i++){
                cells[i].innerText = gameBoard.getMark(i);
            }
        }
        /*
        Running the function for first time
        when page loads and update the grid
        */
        update();
        return {update}
    })();

    function Player(name,mark){
        this.mark = mark;
        return {name,mark}
    }

    function playRound(playerOne,playerTwo){
        const cells = document.querySelectorAll('.cell');
        let playerOneTurn = true;
        for(cell of cells){
            cell.addEventListener('click', (e)=>{
                if(!gameBoard.checkGame()){
                    if(playerOneTurn){
                        let indx = e.target.dataset.index;
                        playTurn(playerOne,indx);
                        playerOneTurn = false;
                        display.update()
                    } else {
                        let indx = e.target.dataset.index;
                        playTurn(playerTwo,indx);
                        playerOneTurn = true;
                        display.update();
                    }
                    console.log("Check winner: "+gameBoard.checkGame());
                    if(gameBoard.checkGame() != ''){
                        console.log('Game Over')
                    }
                }
            })
        }
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
        // display.update();
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