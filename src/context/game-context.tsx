import type { GameState, GameAction } from "@/types/game";
import { createContext, useContext, useReducer } from "react";
import { gameReducer, initialState } from "@/utils/reducer";

interface GameContextStateProps {
  state: GameState;
}

const GameStateContext = createContext<GameContextStateProps | undefined>(
  undefined
);
const GameDispatchContext = createContext<
  React.Dispatch<GameAction> | undefined
>(undefined);

export function useGameContext() {
  const state = useContext(GameStateContext);
  const dispatch = useContext(GameDispatchContext);
  if (!state || !dispatch) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return { state, dispatch };
}

interface ChildrenProps {
  children: React.ReactNode;
}
export function GameProvider({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameStateContext.Provider value={{ state }}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}
