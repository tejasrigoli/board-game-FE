import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug } from '@fortawesome/free-solid-svg-icons'
import "./squares.css"

interface Props {
    id: number;
}

export const BugDisplay: React.FC<Props> = ({ id }) => {

    return (
        <React.Fragment>
            <div className="blank"></div>
            <div className="icon">
                <FontAwesomeIcon icon={faBug} size="3x" color="firebrick" />
            </div>
            <div className="blank"></div>
        </React.Fragment>
    );

};