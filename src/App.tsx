import { useState } from 'react'
import './App.css'
import { defaultFields } from './constants';
import { Field, Player } from './types';
import { checkDraw, checkWin } from './actions';
import { Info, Fields } from './components';


function App() {
  const [fields, setFields] = useState<Field[]>(defaultFields);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winCombo, setWinCombo] = useState<number[] | null>(null);
  // const [isGameEnded,setIsGameEnded] = useState(false);
  const [draw,setDraw] = useState<boolean>(false);

 
  
  const handleClick = (index: number) => {
    if(fields[index] || winCombo || draw) return;
    const newFields = [...fields];
    newFields[index] = currentPlayer;
    setFields(prevState => prevState.map((field, i) => i === index ? currentPlayer : field));
    const existWinCombo = checkWin(newFields, currentPlayer);
    if(existWinCombo) {
      return setWinCombo(existWinCombo);
    } else if (checkDraw(newFields)) {
      return setDraw(true);
    } 
    
    
    setCurrentPlayer((prev) => (prev === "O" ? "X" : "O"));
  }

  const handleReset = () => {
    setCurrentPlayer("X");
    setFields(defaultFields);
    setDraw(false);
    setWinCombo(null);
  }

  return (
   <div className="app"> 
      <h1>Крестики-Нолики</h1>
      <Info currentPlayer={currentPlayer} draw={draw} win={!!winCombo} />
      <Fields fields={fields} onClick={handleClick} winCombo={winCombo} />
      <button onClick={handleReset} className='reset'>Новая Игра</button>
   </div>
  )
}

export default App
