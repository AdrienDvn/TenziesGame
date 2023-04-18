import { useState } from "react";
import React from "react";

export default function Die(props) {

  function allNewDice() {
    const newDice =[];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.floor(Math.random() * 6) + 1)
    }
    return (
      newDice
    )
  }


  return (
    <div className="die--face">
      <h2 className="die--num">{props.value}</h2>
    </div>
  )
}
