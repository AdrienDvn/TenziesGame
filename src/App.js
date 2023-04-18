import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Die from './components/Die';

import {nanoid} from 'nanoid'

export default function App() {

  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {

    const newDice =[];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld : true,   // la ça devient chaud pour moic'est tendouche
        id: nanoid()
      })
    }
    return (
      newDice
    )
  }

  function rollDice() {
    setDice(allNewDice())
  }

  const diceElements = dice.map(die=> (
    <Die key={die.id} value={die.value} isHeld={die.isHeld}/>
  ))



  return (
    <main>
      <div className='dice--container'>
        {diceElements}
      </div>
      <button onClick={rollDice} className='dice--btn'>Roll</button>
    </main>
  );
}
