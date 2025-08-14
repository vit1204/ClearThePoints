import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { useGameContext } from "@/context/game-context";

export function GameStatus() {
  const { state } = useGameContext();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {state.state.level}
            </div>
            <div className="text-sm text-blue-200">Level</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {state.state.score}
            </div>
            <div className="text-sm text-blue-200">Score</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {formatTime(state.state.timer)}
            </div>
            <div className="text-sm text-blue-200">Time</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {state.state.combo}
            </div>
            <div className="text-sm text-blue-200">Combo</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {state.state.bestTime > 0
                ? formatTime(state.state.bestTime)
                : "--"}
            </div>
            <div className="text-sm text-blue-200">Best Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Game Status Message */}
      {state.state.gameStatus && (
        <Card className="bg-white/10 border-white/20 mb-6">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-white">
              {state.state.gameStatus}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements */}
      {state.state.achievements.length > 0 && (
        <Card className="bg-white/10 border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-white" />
              <h3 className="text-white font-semibold">Achievements</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.state.achievements.map((achievement, index) => (
                <Badge key={index} className="bg-yellow-600 text-white">
                  {achievement}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
