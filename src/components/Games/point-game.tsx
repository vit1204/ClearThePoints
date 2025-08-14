"use client";

import { GameStatus } from "./game-status";
import { GameControl } from "./game-control";
import { GameBoard } from "./game-board";
import { GameProvider } from "@/context/game-context";

function PointGameContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 font-serif">
            Enhanced Point Game
          </h1>
          <p className="text-blue-200">
            Click the numbers in order as fast as you can!
          </p>
        </div>

        <GameStatus />
        <GameControl />
        <GameBoard />
      </div>
    </div>
  );
}

export default function PointGame() {
  return (
    <GameProvider>
      <PointGameContent />
    </GameProvider>
  );
}
