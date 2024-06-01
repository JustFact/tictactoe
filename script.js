/*
Goal: No code in global scope
Using Vanilla javaScript:
Factory Functions
IIFE module pattern
*/

const game = (function(){
    const gameBoard = (function(){  //Complete game will only have one gameBoard
        const board = [
            'x','o','x',
            'o','x','o',
            'x','o','x',
        ]
        const getMark = (index) => board[index];
        const setMark = (index,mark) => board[index-1] = mark;
        return {getMark, setMark}      
    })()
    
    function displayBoardConsole(){
        for(let i = 0; i<9; i = i+3){
            console.log(gameBoard.getMark(i+0),gameBoard.getMark(i+1),gameBoard.getMark(i+2));
        }
    }

    function start(){
        gameBoard.setMark(5,'F');
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