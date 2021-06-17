import React from "react";
import { SquareConfigData } from "./SquareData";
import { SquareType } from "./SquareType";
import { BugDisplay } from "../squares/BugDisplay";
import { ChanceDisplay } from "../squares/ChanceDisplay";
import { PropertyDisplay } from "../squares/PropertyDisplay";
import { TurnDisplay } from "../squares/TurnDisplay";
import { GoDisplay } from "../squares/GoDisplay";
import { PitStopDisplay } from "../squares/PitStopDisplay";
import "./board.css"


interface Props {
    id: number;
}

export const SquareInfo: React.FC<Props> = ({ id }) => {

    const type: SquareType | undefined = SquareConfigData.get(id)?.type;

    const getInfo = () => {
        if (type === SquareType.Bug) {
            return <BugDisplay id={id} />
        }
        if (type === SquareType.Chance) {
            return <ChanceDisplay id={id} />
        }
        if (type === SquareType.Turn) {
            return <TurnDisplay id={id} />
        }
        if (type === SquareType.Go) {
            return <GoDisplay id={id} />
        }
        if (type === SquareType.PitStop) {
            return <PitStopDisplay id={id} />
        }
        return <PropertyDisplay id={id} />
    };

    return (
        getInfo()
    );

};