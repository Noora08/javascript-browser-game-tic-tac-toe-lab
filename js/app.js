



/*-------------------------------- Constants --------------------------------*/



const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

  ]
  

/*---------------------------- Variables (state) ----------------------------*/


let board
let turn
let winner
let tie
let PlayerO 
let squareIndex


/*------------------------ Cached Element References ------------------------*/

// const resultDisplayEl = document.querySelector('#message')
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
// console.log(squareEls)
// console.log(messageEl)
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

const init = () =>{
    console.log('init')
    board = ['', '', '', '', '', '', '', '', '']
    turn = 'X'
    winner = false
    tie = false
    messageEl.textContent = 'Choose a square'
    squareEls.forEach(square =>{
        square.textContent = ''
    })
    
}

const render = () =>{
    updateBoard()
    updateMessage()

}

//loop over the board elements and store each square index 
const updateBoard = () => {
    board.forEach((element, index) => {
        const square = squareEls[index]
        // square.textContent = turn




        // console.log(square)
        // //console.log(element)
        // if (square.innerText === 'X'){
        //     square.style.background = 'red'
        // }
        // else if (element.textContent === 'O'){
        //     element.style.background ='blue'
        // }
        // else if (element.textContent === ''){
        //     element.style.background = 'Grey'
        // }

    });
}


//prints messages
const updateMessage = () =>{
    if (winner === false && tie === false){
        messageEl.textContent = `it's ${turn} turn`
    }
    else if (winner === false && tie === true){
        messageEl.textContent = 'You tied!'
    }
    else{
        messageEl.textContent = 'Congrats! You Win'
    }
}



//d. If the board has a value of 'X' or 'O' at the squareIndex position, immediately return out of handleClick.
//  That square is already taken. Also, if winner is true, immediately return out of handleClick because the game is over.



// insure a square is not clicked twice /and/ call other functions 
const handleClick = (event) =>{
    squareIndex = event.target.id
        //console.log(squareIndex)
        if(board[squareIndex] === 'X' || board[squareIndex] === 'O' ){
            console.log(board[squareIndex])
            messageEl.textContent = 'That square is already taken'
        }
        else if (winner === true){
                return
            }
        else {

            console.log('else')
            squareEls.textContent= turn
            placePiece(squareIndex)
        }
       
    
    // if (board[squareIndex] === 'X' || board[squareIndex] === 'O' ){
    //     console.log('hi')
    //     messageEl.textContent = 'That square is already taken'
    // }
    // else if (winner === true){
    //     return
    // }

    
    // placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
    
    
}




//Place player symbol on the board
const placePiece = (index) =>{
    board[index] = turn
    squareEls[index].textContent = turn 
}




//loop through winningCombos and store the index
//check winner
const checkForWinner = () => {
    for(let condition of winningCombos){
        
    
    

    if ( board[condition[0]] !== "" && board[condition[0]] === board[condition[1]] && board[condition[0]] === board[condition[2]]) {
        winner = true
      }
}
}

// console.log('winner is ' + winner)





const checkForTie =()=>{
    if(winner === true){
        return
    }
    else if (board.includes('')){
        tie = false
    }
    else{
        tie = true
    }
    // console.log('Tie state:', tie);
}



//change symbols based on turn

const switchPlayerTurn =() =>{
    if (winner === true){
        return
    }
    else if(winner === false){
        if (turn === 'X'){
            turn = 'O'
        }
        else if (turn === 'O'){
            turn = 'X'
        }
    }
}


/*----------------------------- Event Listeners -----------------------------*/


//listen for clicks on squares and call handleClick function
squareEls.forEach(square => {
    square.addEventListener('click', handleClick)
})


  
//listen for clicks on reset button and call init function
resetBtnEl.addEventListener('click', init)




//called when the system load
init()
