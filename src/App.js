import logo from './logo.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import Die from './components/Die';
import Confetti from 'react-confetti';
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
  //this useEffect function is the hardest part, try to rewrite it from scratch :)

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld : false,
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
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
        die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice)
    }

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
        {tenzies === true ? <Confetti/> :''}
      </div>
      <button
        onClick={rollDice}
        className='dice--btn'
      >
        {tenzies === true ? 'New Game':'Roll'}
      </button>
    </main>
  );
}
