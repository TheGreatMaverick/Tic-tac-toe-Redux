import { checkWin, checkDraw } from "./actions";
import { defaultFields } from "./constants";
import { Field, Player } from "./types";

type GameState = {
  fields: Field[];
  currentPlayer: Player;
  winCombo: number[] | null;
  draw: boolean;
};

type Action = { type: "MAKE_MOVE"; index: number } | { type: "RESET_GAME" };

const initialState: GameState = {
  fields: defaultFields,
  currentPlayer: "X",
  winCombo: null,
  draw: false,
};

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "MAKE_MOVE": {
      if (state.fields[action.index] || state.winCombo || state.draw) {
        return state;
      }

      const newFields = [...state.fields];
      newFields[action.index] = state.currentPlayer;

      const winCombo = checkWin(newFields, state.currentPlayer);
      if (winCombo) {
        return { ...state, fields: newFields, winCombo };
      }

      if (checkDraw(newFields)) {
        return { ...state, fields: newFields, draw: true };
      }

      return {
        ...state,
        fields: newFields,
        currentPlayer: state.currentPlayer === "O" ? "X" : "O",
      };
    }

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
};

export const createStore = (
  reducer: typeof gameReducer,
  initialState: GameState
) => {
  let state = initialState;
  const listeners: (() => void)[] = [];

  return {
    dispatch: (action: Action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },
    getState: () => state,
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      };
    },
  };
};

export const store = createStore(gameReducer, initialState);
