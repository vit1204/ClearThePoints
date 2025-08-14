"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGameContext } from "@/context/game-context";
import { useEffect } from "react";
import { colors } from "@/utils/reducer";

export function GameBoard() {
  const { state, dispatch } = useGameContext();

  const handleCircleClick = (num: number) => {
    const isCorrect = state.state.clickedOrder.length + 1 === num;
    dispatch({ type: "CIRCLE_CLICKED", payload: { number: num, isCorrect } });

    if (isCorrect) {
      if (state.state.combo === 4) {
        dispatch({ type: "ADD_ACHIEVEMENT", payload: "5 Combo!" });
      }
      if (state.state.timer < 10 && num === state.state.points) {
        dispatch({ type: "ADD_ACHIEVEMENT", payload: "Speed Demon!" });
      }

      // Check if level completed
      if (num === state.state.points) {
        dispatch({ type: "CLEAR_INTERVAL" });
        dispatch({ type: "GAME_COMPLETED" });

        // Auto advance to next level after 2 seconds
        setTimeout(() => {
          dispatch({ type: "NEXT_LEVEL" });
        }, 2000);
      }
    } else {
      dispatch({ type: "CLEAR_INTERVAL" });
      setTimeout(() => {
        dispatch({ type: "RESET_GAME" });
      }, 2000);
    }
  };

  useEffect(() => {
    if (!state.state.isStarted || state.state.circles.length === 0) return;

    const highlightTimer = setTimeout(() => {
      const timeSinceLastClick = Date.now() - state.state.lastClickTime;
      if (timeSinceLastClick >= 3000) {
        dispatch({ type: "SET_HIGHLIGHT", payload: true });
      }
    }, 3000);

    return () => clearTimeout(highlightTimer);
  }, [
    state.state.isStarted,
    state.state.lastClickTime,
    state.state.circles.length,
    dispatch,
  ]);

  useEffect(() => {
    if (state.state.gameStatus?.includes("Completed")) {
      const timer = setTimeout(() => {
        dispatch({ type: "START_GAME" });

        const newCircles = [];

        for (let i = 1; i <= state.state.points; i++) {
          newCircles.push({
            id: i,
            number: i,
            left: Math.random() * 75 + 5 + "%",
            top: Math.random() * 75 + 5 + "%",
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }

        dispatch({ type: "GENERATE_CIRCLES", payload: newCircles });

        const intervalId = setInterval(() => {
          dispatch({ type: "TICK_TIMER" });
        }, 1000);
        dispatch({ type: "SET_INTERVAL_ID", payload: intervalId });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [state.state.gameStatus, state.state.points, dispatch]);

  const getNextNumber = () => state.state.clickedOrder.length + 1;

  return (
    <Card className="bg-white/5 border-white/20">
      <CardContent className="p-8">
        <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-lg overflow-hidden">
          {state.state.circles.map((circle) => {
            const isNextCircle = circle.number === getNextNumber();
            const shouldHighlight = state.state.highlightNext && isNextCircle;

            return (
              <button
                key={circle.id}
                data-number={circle.number}
                onClick={() => handleCircleClick(circle.number)}
                className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-200 hover:scale-110 transform ${
                  circle.color || "bg-blue-500"
                } shadow-lg hover:shadow-xl ${
                  shouldHighlight
                    ? "ring-4 ring-yellow-400 ring-opacity-75 animate-pulse"
                    : ""
                }`}
                style={{
                  left: circle.left,
                  top: circle.top,
                }}
              >
                {circle.number}
              </button>
            );
          })}

          {state.state.circles.length === 0 && state.state.isStarted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-xl">Loading circles...</div>
            </div>
          )}

          {!state.state.isStarted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-2xl font-bold mb-2">Ready to Play?</div>
                <div className="text-blue-200">Click Start Game to begin!</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
