import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import "./squares.css"

interface Props {
    id: number;
}

export const ChanceDisplay: React.FC<Props> = ({ id }) => {

    return (
        <React.Fragment>
            <div className="blank"></div>
            <div className="icon">
                <FontAwesomeIcon icon={faChartLine} size="3x" color="dodgerblue" />
            </div>
            <div className="square-name">CHANCE</div>
        </React.Fragment>
    );

};