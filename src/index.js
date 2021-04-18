import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import { ToastProvider } from 'react-toast-notifications';
import './App.css'
import { ToastDemo } from './ToastDemo';

var clicksCounter = 0;

const Square = (props) => {
  
  return(
    <button className="square"
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

  const renderSquare = (i) => {
    return(
      <Square 
      value={squares[i]}
      onClickEvent={()=> handleClickEvent(i)}/>
    )
  }
  const winner = calculateWinner(squares)
  var status = winner ? 
  `Winner: ${winner} 😎` :
  `Your turn: ${xIsNext ? 'X' : 'O'}`

  
  if(clicksCounter === 5 && !winner)
  {
    status = `Draw 🤝`
  }

  return(
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
      {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div><div className="board-row">
      {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div><div className="board-row">
      {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
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
      console.log(winningLine)
      return squares[a] //'X' or 'O';
    }
    
  }
  return null;
}
