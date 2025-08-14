import type { GameState, GameAction } from "@/types/game";

export const initialState: GameState = {
  points: 0,
  circles: [],
  isStarted: false,
  clickedOrder: [],
  timer: 0,
  intervalId: null,
  gameStatus: null,
  level: 1,
  score: 0,
  combo: 0,
  achievements: [],
  bestTime: 0,
  totalGamesPlayed: 0,
  highlightNext: false,
  lastClickTime: 0,
};
export const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_POINTS":
      return { ...state, points: action.payload };

    case "START_GAME":
      return {
        ...state,
        isStarted: true,
        gameStatus: null,
        clickedOrder: [],
        timer: 0,
        combo: 0,
        totalGamesPlayed: state.totalGamesPlayed + 1,
        highlightNext: false,
        lastClickTime: Date.now(),
      };

    case "RESET_GAME":
      if (state.intervalId) clearInterval(state.intervalId);
      return {
        ...state,
        isStarted: false,
        circles: [],
        clickedOrder: [],
        timer: 0,
        intervalId: null,
        combo: 0,
        // Reset highlight on game reset
        highlightNext: false,
        lastClickTime: 0,
      };

    case "GENERATE_CIRCLES":
      return { ...state, circles: action.payload };

    case "CIRCLE_CLICKED":
      const { number, isCorrect } = action.payload;
      if (isCorrect) {
        const newCombo = state.combo + 1;
        const basePoints = 10;
        const comboBonus = Math.floor(newCombo / 3) * 5;
        const levelBonus = state.level * 2;
        const pointsEarned = basePoints + comboBonus + levelBonus;

        return {
          ...state,
          clickedOrder: [...state.clickedOrder, number],
          circles: state.circles.filter((circle) => circle.number !== number),
          combo: newCombo,
          score: state.score + pointsEarned,
          highlightNext: false,
          lastClickTime: Date.now(),
        };
      } else {
        return {
          ...state,
          combo: 0,
          gameStatus: "Game Over! Wrong order!",
          highlightNext: false,
        };
      }

    case "TICK_TIMER":
      return { ...state, timer: state.timer + 1 };

    case "SET_INTERVAL_ID":
      return { ...state, intervalId: action.payload };

    case "CLEAR_INTERVAL":
      if (state.intervalId) clearInterval(state.intervalId);
      return { ...state, intervalId: null };

    case "GAME_COMPLETED":
      const newBestTime =
        state.bestTime === 0 || state.timer < state.bestTime
          ? state.timer
          : state.bestTime;
      return {
        ...state,
        gameStatus: `Level ${state.level} Completed! 🎉`,
        bestTime: newBestTime,
        // Reset highlight on game completion
        highlightNext: false,
      };

    case "NEXT_LEVEL":
      return {
        ...state,
        level: state.level + 1,
        points: state.points + 2,
        // Reset highlight on next level
        highlightNext: false,
      };

    case "ADD_ACHIEVEMENT":
      if (!state.achievements.includes(action.payload)) {
        return {
          ...state,
          achievements: [...state.achievements, action.payload],
        };
      }
      return state;

    case "SET_HIGHLIGHT":
      return { ...state, highlightNext: action.payload };

    case "UPDATE_LAST_CLICK_TIME":
      return { ...state, lastClickTime: Date.now() };

    default:
      return state;
  }
}
