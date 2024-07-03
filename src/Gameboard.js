import React, { useState, useEffect } from 'react';

const BOARD_SIZE = 8;
const PLAYER_1 = "RED";
const PLAYER_2 = "BLUE";

function GameBoard() {
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    
    for (let row = 0; row < 3; row++) {
      for (let col = (row % 2 === 0) ? 1 : 0; col < BOARD_SIZE; col += 2) {
        newBoard[row][col] = PLAYER_1;
      }
    }
    
    for (let row = BOARD_SIZE - 3; row < BOARD_SIZE; row++) {
      for (let col = (row % 2 === 0) ? 1 : 0; col < BOARD_SIZE; col += 2) {
        newBoard[row][col] = PLAYER_2;
      }
    }
    
    setBoard(newBoard);
  };

  const handleClick = (row, col) => {
    if (winner) return;

    if (selectedPiece) {
      if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
        setSelectedPiece(null);
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
        checkWinner();
      } else {
        setSelectedPiece(null);
      }
    } else if (board[row][col] === currentPlayer) {
      setSelectedPiece({ row, col });
    }
  };

  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    const piece = board[fromRow][fromCol];
    const rowDiff = toRow - fromRow;
    const colDiff = Math.abs(toCol - fromCol);

    if (board[toRow][toCol] !== 0) return false;

    if (piece === PLAYER_1 && rowDiff === 1 && colDiff === 1) return true;
    if (piece === PLAYER_2 && rowDiff === -1 && colDiff === 1) return true;

    if (colDiff === 2 && Math.abs(rowDiff) === 2) {
      const jumpedRow = (fromRow + toRow) / 2;
      const jumpedCol = (fromCol + toCol) / 2;
      const jumpedPiece = board[jumpedRow][jumpedCol];
      return jumpedPiece !== 0 && jumpedPiece !== piece;
    }

    return false;
  };

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = [...board];
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = 0;

    if (Math.abs(toRow - fromRow) === 2) {
      const jumpedRow = (fromRow + toRow) / 2;
      const jumpedCol = (fromCol + toCol) / 2;
      newBoard[jumpedRow][jumpedCol] = 0;
    }

    setBoard(newBoard);
  };

  const checkWinner = () => {
    const player1Pieces = board.flat().filter(cell => cell === PLAYER_1).length;
    const player2Pieces = board.flat().filter(cell => cell === PLAYER_2).length;

    if (player1Pieces === 0) setWinner(PLAYER_2);
    if (player2Pieces === 0) setWinner(PLAYER_1);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      {winner && <div style={{ fontSize: '24px', marginBottom: '20px', color: 'white' }}>Player {winner} wins!</div>}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${BOARD_SIZE}, 50px)`,
        gridTemplateRows: `repeat(${BOARD_SIZE}, 50px)`,
        gap: '1px',
        backgroundColor: '#000',
        border: '1px solid #000'
      }}>
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: (rowIndex + colIndex) % 2 === 0 ? '#fff' : '#000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                border: selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex ? '2px solid yellow' : 'none'
              }}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell !== 0 && (
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: cell === PLAYER_1 ? 'red' : 'blue'
                }} />
              )}
            </div>
          ))
        ))}
      </div>
      <div style={{ marginTop: '20px', fontSize: '18px', color: 'white' }}>Current Player: {currentPlayer}</div>
    </div>
  );
}

export default GameBoard;
