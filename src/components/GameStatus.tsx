import React from "react";

const GameStatus = ({ gameStatus }) => {
  if (gameStatus === null) return null;

  return (
    <div
      style={{
        color: gameStatus === "All Cleared" ? "green" : "red",
        fontSize: "24px",
      }}
    >
      {gameStatus}
    </div>
  );
};

export default GameStatus;