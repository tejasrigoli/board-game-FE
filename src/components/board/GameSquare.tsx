import React, { useState } from "react";
import { BoardSection } from "./BoardSection";
import { SquareConfigData } from "./SquareData";
import { SquareInfo } from "./SquareInfo";
import { SquareType } from "./SquareType";
import "./board.css"
import Player from '../../images/player.svg';
import styled from 'styled-components';

interface Props {
  id: number;
  playerPosition: number;
}

export const GameSquare: React.FC<Props> = ({ id, playerPosition }) => {

  const section: BoardSection = SquareConfigData.get(id)?.section!;
  const squareType: SquareType = SquareConfigData.get(id)?.type!;

  const sectionMap = new Map<BoardSection, string>([
    [BoardSection.Top, "top"], [BoardSection.Right, "right"], [BoardSection.Left, "left"], [BoardSection.Bottom, "bottom"]
  ]);

  const squareTypeClass = new Map<SquareType, string>([
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


  return (
    <div className={getSquareClassName()} id={getSquareId()}>
      <div className={getContainerClassName()}>
      {
        id==playerPosition &&  <PlayerWrapper>
        <img className="player" alt="Player" src={Player} />
        </PlayerWrapper>
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
  z-index: 1003;
  transition: all 0.5s ease-out;
  border-color: black;
`