import React from "react";

interface GameControlsProps {
    points: number;
    setPoints: (points: number) => void;
    timer: number;
    startGame: () => void;
    isStarted: boolean;
}

const GameControls = ({ points, setPoints, timer, startGame, isStarted } : GameControlsProps )  => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 23 }}>
        <p>Points</p>
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
        />
      </div>
      <div>Time: {timer}s</div>
      <button onClick={startGame}>{isStarted ? "Restart" : "Play"}</button>
    </div>
  );
};

export default GameControls;