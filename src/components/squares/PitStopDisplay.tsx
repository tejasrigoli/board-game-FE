import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClinicMedical } from '@fortawesome/free-solid-svg-icons'
import { NyThemeData } from "../board/NyTheme";
import "./squares.css"

interface Props {
    id: number;
}

export const PitStopDisplay: React.FC<Props> = ({ id }) => {

    const txt: string | undefined = NyThemeData.get(id)?.name;
    return (
        <React.Fragment>
            <div className="blank"></div>
            <div className="icon">
                <FontAwesomeIcon icon={faClinicMedical} size="3x" color="MediumSeaGreen" />
            </div>
            <div className="square-name"> {txt}</div>
        </React.Fragment>
    );

};