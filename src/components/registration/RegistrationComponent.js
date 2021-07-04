import React, {useState} from 'react';
import axios from "axios";


const RegistrationComponent = (props) => {


        const [teamcount, setTeamcount]  = useState("1");
        const [teamName, setTeamName]  = useState("Team Name");
        const [leaderId, setLeaderId]  = useState({});
        const [mails, setMails]  = useState([]);

    const inputData = (e) => {
        console.log(e.target.value);
        console.log(teamcount);
        setTeamcount(
            e.target.value,
        );
        console.log(teamcount);
    }

   const  changeLeaderId = (id) => {
    setLeaderId({});
            axios.get(`http://localhost:1007/track/team/${id}`).then((response)=>{
                console.log("in track teamL: ",response);
                if(response.data.leader)
                setLeaderId({role:"Leader",id:id});
                setTeamName(response.data.nextTurn.teamName)
                });
    }

    const onLeaderIdChange = (e) => {
        e.target.value.length == 8 &&
        changeLeaderId(e.target.value)
        setLeaderId({});
        setTeamName("Team Name");
    }

    const submit = (e) => {
        e.preventDefault();
        props.setRole(leaderId);
    }

    const mailEnter = (s,i) =>{
        
    }

        var fieldsArray = [];
        for (var i = 1; i <= parseInt(teamcount); i++) {
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
                            onChange = {(e)=>mailEnter(e.target.value,i)}
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
                                onChange = {onLeaderIdChange}
                                required
                            />
                        </div>
                        <div className="form-group text-left">
                            <h6>Team Name</h6>
                            <input type="text"
                                className="form-control"
                                id="teamName"
                                placeholder="Enter your Team Name"
                                value = {teamName}
                                disabled
                            />
                        </div>
                        <div class="form-group">
                            <h6>Team Count</h6>
                            <select class="form-control"
                                defaultValue={teamcount}
                                onChange={inputData} required>
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
                            disabled = {leaderId.role != "Leader"} //|| mails.length != teamcount}
                            onClick={submit}>
                            Register
                        </button>
                    </div>
                </form>
            </div>

        );
}

export default RegistrationComponent;