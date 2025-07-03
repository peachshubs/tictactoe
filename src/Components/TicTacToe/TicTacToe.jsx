import { useEffect, useState } from "react";
import "./style.css";
import circle from "../../Assets/circle.jpg";
import cross from "../../Assets/cross.jpg";
import click from "../../Assets/click.mp3";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value && <img src={value} alt="XO" />}
    </button>
  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setisXTurn] = useState(true);
  const [status, setStatus] = useState("");
  function handleClick(getCurrentSquare) {
    let cpySquares = [...squares];
    if (getWinner(cpySquares) || cpySquares[getCurrentSquare]) return; // This makes sure that X doesn't change to O on clicking again
    new Audio(click).play();
    cpySquares[getCurrentSquare] = isXTurn ? circle : cross;
    setisXTurn(!isXTurn);
    setSquares(cpySquares);
  }

  function getWinner(squares) {
    const winPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [1, 4, 7],
      [0, 3, 6],
      [2, 5, 8],
    ];
    for (let i = 0; i < winPattern.length; i++) {
      const [a, b, c] = winPattern[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  useEffect(() => {
    if (!getWinner(squares) && squares.every((item) => item !== "")) {
      setStatus("Draw! Replay?");
    } else if (getWinner(squares)) {
      setStatus(`Winner is ${isXTurn ? "X" : "O"}! Replay?`);
    } else {
      setStatus(`It's ${isXTurn ? "O" : "X"}'s turn`);
    }
  }, [squares, isXTurn]);

  function handleRestart() {
    setisXTurn(true);
    setSquares(Array(9).fill(""));
  }
  console.log(squares);
  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe!</h1>
      <div className="board">
        <div className="row1">
          <div className="boxes">
            <Square value={squares[0]} onClick={() => handleClick(0)} />
          </div>
          <div className="boxes">
            <Square value={squares[1]} onClick={() => handleClick(1)} />
          </div>
          <div className="boxes">
            <Square value={squares[2]} onClick={() => handleClick(2)} />
          </div>
        </div>

        <div className="row2">
          <div className="boxes">
            <Square value={squares[3]} onClick={() => handleClick(3)} />
          </div>
          <div className="boxes">
            <Square value={squares[4]} onClick={() => handleClick(4)} />
          </div>
          <div className="boxes">
            <Square value={squares[5]} onClick={() => handleClick(5)} />
          </div>
        </div>

        <div className="row3">
          <div className="boxes">
            <Square value={squares[6]} onClick={() => handleClick(6)} />
          </div>
          <div className="boxes">
            <Square value={squares[7]} onClick={() => handleClick(7)} />
          </div>
          <div className="boxes">
            <Square value={squares[8]} onClick={() => handleClick(8)} />
          </div>
        </div>
      </div>
      <h2> {status} </h2>
      <button className="reset" onClick={handleRestart}>
        Reset!
      </button>
    </div>
  );
}
