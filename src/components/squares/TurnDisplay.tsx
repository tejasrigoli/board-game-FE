import React from "react";
import "./squares.css"

interface Props {
    id: number;
}

export const TurnDisplay: React.FC<Props> = ({ id }) => {

    return (
        <React.Fragment>
            <div className="icon"></div>
            {/* <div className="square-name"> Turn</div> */}
        </React.Fragment>
    );

};