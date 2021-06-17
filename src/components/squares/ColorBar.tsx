import React from "react";
import { SquareConfigData, squareGroupColorMap } from "../board/SquareData";
import "./squares.css"

interface Props {
    id: number;
}

export const ColorBar: React.FC<Props> = ({ id }) => {

    const groupId: number = SquareConfigData.get(id)?.groupId!;

    const getClassName = () => {
        return "square-color-bar " + squareGroupColorMap.get(groupId);
    };

    return (
        <div className={getClassName()}></div>
    );

};