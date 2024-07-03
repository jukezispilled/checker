import React from 'react';
import './App.css';
import GameBoard from './Gameboard';

function Game() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-zinc-900">
      <div className='grid'>
        <div className='text-white'>
        </div>
        <GameBoard />
      </div>
    </div>
  );
}

export default Game;