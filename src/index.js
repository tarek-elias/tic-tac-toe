import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import { ToastProvider } from 'react-toast-notifications';
import './App.css'
import { ToastDemo } from './ToastDemo';
import {ToWords} from 'to-words'
var clicksCounter = 0;

const Square = (props) => {
  
  return(
    <button
    id={props.squareId}
    className="square"
    onClick={props.onClickEvent}>
      {props.value}
    </button>
  )
}



const Board = () => {
  
  const initialSquares = Array(9).fill(null)
  const [squares, setSquares] =  useState(initialSquares)
  const [xIsNext, setXIsNext] = useState(true)


  const handleClickEvent = (i) =>{
   
    const newSquares = [...squares]
    const winnerDeclared = Boolean(calculateWinner(newSquares))
    const squareFilled = Boolean(newSquares[i])
    if(winnerDeclared || squareFilled)
    {
      return;
    }


    if(xIsNext)
    {
      newSquares[i] = 'X'
      setSquares(newSquares)
      
      const x = aiTurn(newSquares)
      newSquares[x] = 'O'
      setSquares(newSquares)
      
    }
    else{
      setXIsNext(!xIsNext)
    }
    clicksCounter++;
  }

  const aiTurn = (sq) => {

    const emptyCells = []
    for(let item = 0; item < 9; item++)
    {
      if(sq[item] == null)
      {
        emptyCells.push(item)
      }
    }
    let randEmptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    //console.log(randEmptyCell)
    return randEmptyCell
  }

  const renderSquare = (i, k) => {
    return(
      <Square 
      squareId={k}
      value={squares[i]}
      onClickEvent={()=> handleClickEvent(i)}/>
    )
  }
  const winner = calculateWinner(squares)
  /*var status = winner ? 
  `Winner: ${winner} 😎` :
  `Your turn: ${xIsNext ? 'X' : 'O'}`*/
  var status = '';
  if(winner)
  {
    status= `Winner: ${winner} 😎`
    
  }
  else
  {
    status =`Your turn: ${xIsNext ? 'X' : 'O'}`
  }

  
  
  if(clicksCounter === 5 && !winner)
  {
    status = `Draw 🤝`
    
  }

  return(
    <div className="fullBoard">
      <div className="status">{status}</div>
      <div className="board-row">
      {renderSquare(0, 'zero')}{renderSquare(1, 'one')}{renderSquare(2, 'two')}
      </div><div className="board-row">
      {renderSquare(3, 'three')}{renderSquare(4, 'four')}{renderSquare(5, 'five')}
      </div><div className="board-row">
      {renderSquare(6, 'six')}{renderSquare(7, 'seven')}{renderSquare(8, 'eight')}
      </div>
    </div>
  )
}


const Game = () => {
 
  return(
    <div className="game">
      Tic-Tac-Toe <div className="tarek"><ToastProvider><ToastDemo /></ToastProvider></div>
      <br />❌ 🆚 ⭕ 
      <Board />
      <br />
      
      <a className="reText" href="./index.js">Reload 🌝</a>
    </div>
  )
}

ReactDOM.render(<Game />, document.getElementById('root'))


function calculateWinner(squares)
{
  const winningLine = []
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6] //diagonals
  ]
  for(let line of lines)
  {
    const [a, b, c] = line
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    {
      winningLine[0] = a
      winningLine[1] = b
      winningLine[2] = c
      markWinningLine(winningLine, squares[a])
      return squares[a] //'X' or 'O';
    }
    
  }
  return null;
}

const markWinningLine = (winPath, winnerOne) => {
  const [cell1, cell2, cell3] = winPath
  const toWords = new ToWords();
  let cellId1 = toWords.convert(cell1).toLowerCase()
  let cellId2 =  toWords.convert(cell2).toLowerCase()
  let cellId3 =  toWords.convert(cell3).toLowerCase()

  let x = document.getElementById(cellId1)
  let y = document.getElementById(cellId2)
  let z = document.getElementById(cellId3)
  
  if(winnerOne === 'X')
  {

    x.style.backgroundColor = 'green'
    y.style.backgroundColor = 'green'
    z.style.backgroundColor = 'green'
  
  }
  else{
    x.style.backgroundColor = 'red'
    y.style.backgroundColor = 'red'
    z.style.backgroundColor = 'red'
    
  }
  
}

