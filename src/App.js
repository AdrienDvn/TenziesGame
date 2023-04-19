import logo from './logo.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import Die from './components/Die';

import {nanoid} from 'nanoid'

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
      console.log("you won !");
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld : false,   // la ça devient chaud pour moic'est tendouche
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice =[];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return (
      newDice
    )
  }


  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
        die : generateNewDie()
    }))
  }


  const diceElements = dice.map(die=> (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={()=> holdDice(die.id)}
    />
    )
  )

  function holdDice(id) {
    // console.log(id);
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} : die
    }))
  }

  return (
    <main>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same, Click each die to freeze it as its current value between rolls. </p>
      <div className='dice--container'>
        {diceElements}
      </div>
      <button onClick={rollDice} className='dice--btn'>Roll</button>
    </main>
  );
}
