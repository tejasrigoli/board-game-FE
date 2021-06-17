import axios from "axios";
import React, { Component, useState } from "react";
import { GameSquare } from "./GameSquare";
import "./board.css"

export default function GameBoard() {
  const num_squares: Array<number> = Array.from(Array(40));
  
  return (
    <React.Fragment>
      <div className="board">
        {num_squares.map((n, index) => {
          const id: number = index + 1;
          return (<GameSquare
            id={id}
            key={id}
          />)
        })}
        <div className="center-square square">
          <div className="center-txt">
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
