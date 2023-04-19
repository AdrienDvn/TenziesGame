import { useState } from "react";
import React from "react";

export default function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }


  // function handleHeldClick() {
  //   console.log('number is clicked')
  //   // props.isHeld === true ? console.log('it is held yup') : ''
  // }

  return (
    <div className="die--face" onClick={props.holdDice} style={styles}>
      <h2 className="die--num">{props.value}</h2>
    </div>
  )
}
