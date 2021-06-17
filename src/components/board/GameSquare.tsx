import React from "react";
import { BoardSection } from "./BoardSection";
import { SquareConfigData } from "./SquareData";
import { SquareInfo } from "./SquareInfo";
import { SquareType } from "./SquareType";
import "./board.css"

interface Props {
  id: number;
}

export const GameSquare: React.FC<Props> = ({ id }) => {

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
        <SquareInfo id={id} />
      </div>
    </div>
  );

};
