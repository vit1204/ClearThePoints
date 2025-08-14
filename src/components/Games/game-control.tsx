"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGameContext } from "@/context/game-context";
import { colors } from "@/utils/reducer";

export function GameControl() {
  const { state, dispatch } = useGameContext();

  const startGame = () => {
    dispatch({ type: "START_GAME" });
    generateCircles(state.state.points);
    startTimer();
  };

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const generateCircles = (num: number) => {
    const newCircles = [];

    for (let i = 1; i <= num; i++) {
      newCircles.push({
        id: i,
        number: i,
        left: Math.random() * 75 + 5 + "%",
        top: Math.random() * 75 + 5 + "%",
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    dispatch({ type: "GENERATE_CIRCLES", payload: newCircles });
  };

  const startTimer = () => {
    const id = setInterval(() => {
      dispatch({ type: "TICK_TIMER" });
    }, 1000);
    dispatch({ type: "SET_INTERVAL_ID", payload: id });
  };

  return (
    <Card className="bg-white/10 border-white/20 mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="text-white font-medium">Points:</label>
            <input
              type="number"
              min="3"
              max="20"
              value={state.state.points}
              onChange={(e) =>
                dispatch({
                  type: "SET_POINTS",
                  payload: Number.parseInt(e.target.value) || 3,
                })
              }
              disabled={state.state.isStarted}
              className="w-20 px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={startGame}
              disabled={state.state.isStarted}
              className="bg-green-600 hover:bg-green-700 px-8"
            >
              {state.state.isStarted ? "Playing..." : "Start Game"}
            </Button>

            <Button
              onClick={resetGame}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
