import React, { useState, useCallback } from 'react';
import './App.css';
import GameBoard from './Gameboard';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import Xlogo from "./XLogo.jpg";
import TG from "./TG.png";

function App() {
  const [showGameBoard, setShowGameBoard] = useState(false);

  const toggleGameBoard = useCallback(() => {
    if (window.innerWidth >= 768) { // Check if screen width is md and up (768px)
      setShowGameBoard(true);
    }
  }, []);

  const handleBack = () => {
    setShowGameBoard(false);
  };

  return (
    <div className='h-screen w-screen relative overflow-clip'>
      {showGameBoard ? (
        <div className='bg-black'>
          <GameBoard />
          <div className="absolute top-6 left-6">
            <button
              className="animated-gradientt font-custom text-4xl md:text-6xl text-white py-3 px-6 rounded-full transition-colors duration-300"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="absolute bottom-10 left-10 flex flex-row z-30 hidden md:flex">
            <a
              href="https://x.com/"
              className="p-2 hover:scale-110 transition ease-in-out duration-200"
            >
              <img src={Xlogo} alt="Xlogo" className="w-10 h-10 rounded-md" />
            </a>
            <a
              href="https://t.me/"
              className="p-2 hover:scale-110 transition ease-in-out duration-200"
            >
              <img src={TG} alt="Tg logo" className="w-10 h-10" />
            </a>
          </div>
          {/* Small screen social media links */}
          <div className="absolute bottom-5 left-5 flex flex-col items-center md:hidden">
            <div className="flex flex-row">
              <a
                href="https://x.com/"
                className="p-2 hover:scale-110 transition ease-in-out duration-200"
              >
                <img src={Xlogo} alt="Xlogo" className="w-10 h-10 rounded-md" />
              </a>
              <a
                href="https://t.me/"
                className="p-2 hover:scale-110 transition ease-in-out duration-200"
              >
                <img src={TG} alt="Tg logo" className="w-10 h-10" />
              </a>
            </div>
          </div>
          <div className="absolute inset-0 overflow-clip -rotate-45 -z-10 hidden md:block">
            <Marquee speed={145}>
              <span className="text-5xl md:text-9xl font-semibold font-custom animated-gradient">
                checker checker checker checker checker checker checker checker checker checker checker checker&nbsp;
              </span>
            </Marquee>
          </div>
          {/* Always visible picture */}
          <div className="absolute inset-0 flex flex-col justify-center items-center cursor-pointer">
            <motion.img
              src="/checker.jpg"
              alt="Tunes"
              className="-mt-[7.5%] w-[40%] md:w-[25%] h-auto"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={toggleGameBoard}
            />
          </div>
          {/* Buy Now Button */}
          <div className="fixed right-6 top-6 bg-black md:hover:scale-105 transition duration-150 ease-in-out">
            <a
              href="https://pump.fun/board"
              className="animated-gradientt font-custom text-5xl md:text-7xl text-white py-3 px-6 rounded-full transition-colors duration-300"
            >
              BUY
            </a>
          </div>
          <div className='absolute bottom-10 right-10 invisible md:visible text-slate-400'>click the picture for a surprise</div>
        </div>
      )}
    </div>
  );
}

export default App;