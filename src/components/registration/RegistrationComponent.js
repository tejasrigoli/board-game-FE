import React, { useState, useEffect } from 'react';
import GameBoard from "../board/GameBoard";
import CssBaseline from "@material-ui/core/CssBaseline";


class RegistrationComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teamcount: "1"
        }
        this.inputData = this.inputData.bind(this);
        this.game = this.game.bind(this);
    }
    inputData(e) {
        //console.log(label);
        // console.log(e.teamcount);
        console.log(e.target.value);
        console.log(this.state.teamcount);
        // this.setState({ teamcount: e.target.value })
        this.setState({
            teamcount: e.target.value
        });
        console.log(this.state.teamcount);
    }

    game() {
        return (
            // <React.Fragment>
            //     <CssBaseline />
            <GameBoard />
            // </React.Fragment>
        );
    }

    render() {
        var fieldsArray = [];
        for (var i = 1; i <= parseInt(this.state.teamcount); i++) {
            fieldsArray.push(
                <div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">{i}</span>
                        </div>
                        <input type="text"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>
                </div>
            );
        }
        return (

            <div class="card col-20 col-lg-5 border-secondary mt-5 hv-center" >
                {/* <div class="card-header text-white bg-danger text-center">Team Registration</div> */}
                <form>
                    <div class="card-body text-secondary">
                        <div className="form-group text-left">
                            <h6>Leader Id</h6>
                            <input type="text"
                                className="form-control"
                                id="leaderId"
                                placeholder="Enter your Team Id"
                                required
                            />
                        </div>
                        <div className="form-group text-left">
                            <h6>Team Name</h6>
                            <input type="text"
                                className="form-control"
                                id="teamName"
                                placeholder="Enter your Team Name"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <h6>Team Count</h6>
                            <select class="form-control"
                                defaultValue={this.state.teamcount}
                                onChange={this.inputData} required>
                                <option value="1" name="teamcount">1</option>
                                <option value="2" name="teamcount">2</option>
                                <option value="3" name="teamcount">3</option>
                                <option value="4" name="teamcount">4</option>
                                <option value="5" name="teamcount">5</option>
                            </select>
                        </div>

                        <div className='inputs'>
                            <h6>Email address</h6>
                            {fieldsArray}
                        </div>
                        <div className="form-group text-left">
                            <small id="emailHelp" className="form-text text-muted">Please enter all details correctly</small>
                        </div>
                        <button type="submit"
                            className="btn btn-danger pull-right"
                            onClick={this.game()}>
                            Register
                        </button>
                    </div>
                </form>
            </div>

        );
    }
}

export default RegistrationComponent;