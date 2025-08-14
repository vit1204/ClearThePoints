export interface Circle {
  id: number;
  number: number;
  left: string;
  top: string;
  isClicked?: boolean;
  color?: string;
}

export interface GameState {
  points: number;
  circles: Circle[];
  isStarted: boolean;
  clickedOrder: number[];
  timer: number;
  intervalId: number | null;
  gameStatus: string | null;
  level: number;
  score: number;
  combo: number;
  achievements: string[];
  bestTime: number;
  totalGamesPlayed: number;
  highlightNext: boolean;
  lastClickTime: number;
}

export type GameAction =
  | { type: "SET_POINTS"; payload: number }
  | { type: "START_GAME" }
  | { type: "RESET_GAME" }
  | { type: "GENERATE_CIRCLES"; payload: Circle[] }
  | { type: "CIRCLE_CLICKED"; payload: { number: number; isCorrect: boolean } }
  | { type: "TICK_TIMER" }
  | { type: "SET_INTERVAL_ID"; payload: number }
  | { type: "CLEAR_INTERVAL" }
  | { type: "GAME_COMPLETED" }
  | { type: "GAME_OVER" }
  | { type: "ADD_ACHIEVEMENT"; payload: string }
  | { type: "NEXT_LEVEL" }
  | { type: "SET_HIGHLIGHT"; payload: boolean }
  | { type: "UPDATE_LAST_CLICK_TIME" };
