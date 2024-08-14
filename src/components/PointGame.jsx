import React, { useState, useEffect } from 'react';
import "./PointGame.css";

const PointGame = () => {
  const [points, setPoints] = useState(0);
  const [circles, setCircles] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [clickedOrder, setClickedOrder] = useState([]);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleStart = () => {
    if (isStarted) {
      resetGame();
    } else {
      startGame();
    }
  };

  const startGame = () => {
    setIsStarted(true);
    generateCircles(points);
    startTimer();
  };

  const resetGame = () => {
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
        left: Math.random() * 80 + '%',
        top: Math.random() * 80 + '%',
      });
    }
    setCircles(newCircles);
    console.log(newCircles);
  };

const handleCircleClick = (num) => {
if (clickedOrder.length + 1 === num) {
    setClickedOrder([...clickedOrder, num]);
    if (num === points) {
              alert('Congratulations! You cleared all the points!');

      resetGame();
    }
  } else {
    resetGame();
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
      
    
        <div style={{ display:"flex",alignItems:"center", gap:23 }}>
            <p>Points</p>
               <input
        type="text"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        disabled={isStarted}
      />
        </div>
   
      <div>Time: {timer}s</div>
            <button onClick={handleStart}>{isStarted ? 'Restart' : 'Play'}</button>

      <div className="board">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="circle"
            style={{
              left: circle.left,
              top: circle.top,
              backgroundColor: clickedOrder.includes(circle.number) ? 'red' : 'blue',
               transition: 'opacity 1.5s ease-in-out',
    opacity: clickedOrder.includes(circle.number) ? '0' : '1',
              
            }}
            onClick={() => handleCircleClick(circle.number)}
          >
            {circle.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointGame;