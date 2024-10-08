import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons'
import "./squares.css"

interface Props {
    id: number;
}

export const GoDisplay: React.FC<Props> = ({ id }) => {

    return (
        <React.Fragment>
            <div className="blank"></div>
            <div className="icon">
                <FontAwesomeIcon icon={faHandPointLeft} color="green" />
            </div>
            {/* <div className="blank"></div> */}
            {/* <div className="square-name">START</div> */}
        </React.Fragment>
    );

};