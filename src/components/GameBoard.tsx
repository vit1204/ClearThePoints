import React from "react";
interface GameBoardProps {
    circles: any[];
    clickedOrder: number[];
    handleCircleClick: (number: number) => void;
}

const GameBoard = ({ circles, clickedOrder, handleCircleClick } : GameBoardProps) => {
return(
    <div className="board">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="circle"
          style={{
            left: circle.left,
            top: circle.top,
            backgroundColor: clickedOrder.includes(circle.number) ? "red" : "blue",
            transition: "opacity 1.5s ease-in-out",
            opacity: clickedOrder.includes(circle.number) ? "0" : "1",
          }}
          onClick={() => handleCircleClick(circle.number)}
        >
          {circle.number}
        </div>
      ))}
    </div>
)
};

export default GameBoard;