import React, { useState } from "react";
import { BoardSection } from "./BoardSection";
import { SquareConfigData } from "./SquareData";
import { SquareInfo } from "./SquareInfo";
import { SquareType } from "./SquareType";
import "./board.css"
import PlayerBlue from '../../images/player_blue.svg';
import PlayerGreen from '../../images/player_green.svg';
import PlayerRed from '../../images/player_red.svg';
import PlayerYellow from '../../images/player_yellow.svg';
import Player from '../../images/player.svg';
import styled from 'styled-components';



export const GameSquare = ({ id, allPlayerPositions }) => {

  const section = SquareConfigData.get(id)?.section;
  const squareType = SquareConfigData.get(id)?.type;

  const sectionMap = new Map([
    [BoardSection.Top, "top"], [BoardSection.Right, "right"], [BoardSection.Left, "left"], [BoardSection.Bottom, "bottom"]
  ]);

  const squareTypeClass = new Map([
    [SquareType.Bug, "bug"], [SquareType.Chance, "chance"], [SquareType.Go, "passgo"],
    [SquareType.Turn, "turn"], [SquareType.Property, "property"], [SquareType.PitStop, "pitstop"]
  ]);

  const getContainerClassName = () => {
    return "container container-" + sectionMap.get(section);
  };

  const getSquareClassName = () => {
    return "square " + squareTypeClass.get(squareType);
  };

  const getSquareId = () => {
    return "game-square-" + id;
  };

  const players = new Map([
    [0,PlayerBlue],
    [1,PlayerGreen],
    [2,PlayerRed],
    [3,PlayerYellow]
  ]);

  return (
    <div className={getSquareClassName()} id={getSquareId()}>
      <div className={getContainerClassName()}>
      {
        allPlayerPositions.map((playerPosition, index) =>
        {
          console.log("allPlayers ", parseInt(playerPosition.positionInBoard)+1," index ",index);
           if((parseInt(playerPosition.positionInBoard)+1) == id) return (<PlayerWrapper>
          <img className="player" alt="Player" src={players.get(index)} />
          </PlayerWrapper>);
        }
        )
      }
      <SquareInfo id={id} />
      </div>
    </div>
  );

};

const PlayerWrapper = styled.div`
  display: flex;
  position: absolute;
  font-size: 2em;
  width: 8%;
  height: 8%;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 500;
  transition: all 0.5s ease-out;
  border-color: black;
`