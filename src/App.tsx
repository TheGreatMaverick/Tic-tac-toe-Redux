import { useEffect, useState } from "react";
import "./App.css";
import { Info, Fields } from "./components";
import { store } from "./store";

function App() {
  const [gameState, setGameState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setGameState(store.getState());
    });
    return unsubscribe;
  }, []);

  const handleClick = (index: number) => {
    store.dispatch({ type: "MAKE_MOVE", index });
  };

  const handleReset = () => {
    store.dispatch({ type: "RESET_GAME" });
  };

  return (
    <div className="app">
      <h1>Крестики-Нолики</h1>
      <Info
        currentPlayer={gameState.currentPlayer}
        draw={gameState.draw}
        win={!!gameState.winCombo}
      />
      <Fields
        fields={gameState.fields}
        onClick={handleClick}
        winCombo={gameState.winCombo}
      />
      <button onClick={handleReset} className="reset">
        Новая Игра
      </button>
    </div>
  );
}

export default App;
