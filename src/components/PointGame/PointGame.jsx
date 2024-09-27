import React, { useState, useEffect } from "react";
import "./PointGame.css";
import GameBoard from "../GameBoard"
import GameControls from "../GameControls";
import GameStatus from "../GameStatus";

const PointGame = () => {
  const [points, setPoints] = useState(0);
  const [circles, setCircles] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [clickedOrder, setClickedOrder] = useState([]);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [gameStatus, setGameStatus] = useState(null);

  const startGame = async () => {
    try {
      setIsStarted(true);
      generateCircles(points);
      startTimer();
      setGameStatus(null);
    } catch (error) {
      console.log(error);
    }
  };

  const resetGame = async () => {
    setIsStarted(false);
    setCircles([]);
    setClickedOrder([]);
    setTimer(0);
    clearInterval(intervalId);
  };

  const generateCircles = (num) => {
    let newCircles = [];
    for (let i = 1; i <= num; i++) {
      newCircles.push({
        id: i,
        number: i,
        left: Math.random() * 80 + "%",
        top: Math.random() * 80 + "%",
      });
    }
    setCircles(newCircles);
  };

  const handleCircleClick = async (num) => {
    try {
      if (clickedOrder.length + 1 === num) {
        setClickedOrder([...clickedOrder, num]);
        setCircles(circles.filter(circle => circle.number !== num));
        if (num === points) {
          setGameStatus("All Cleared");
          resetGame();
        }
      } else {
        setGameStatus("Game Over");
        resetGame();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startTimer = () => {
    let id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div>
      <GameStatus gameStatus={gameStatus} />
      <GameControls points={points} setPoints={setPoints} timer={timer} startGame={startGame} isStarted={isStarted} />
      <GameBoard circles={circles} clickedOrder={clickedOrder} handleCircleClick={handleCircleClick} />
    </div>
  );
};

export default PointGame;