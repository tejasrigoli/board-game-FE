import React, {useState} from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  TextField,} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import axios from 'axios';

export default (props) =>{
  const [open, setOpen] = React.useState(true);
  const [id, setId] = React.useState();
  const [error, setError] = useState(false);

  const handleClose1 = (role) => {
    // axios.get(`http://localhost:1007/create/gameId/${count}`).then((response)=>{
    //     console.log("in get res: ",response);
    //     });
    // axios.post(`http://localhost:1007/track/dice`,{
    //   leaderId:"8a4ef716",
    //   boardId:"1",
    //   position:"2",
    //   pointScored:20,
    //   isDiceRolled:true,
    //   NumberOnDice:4
    // }).then((response)=>{
    //     console.log("in question res: ",response);
    //     });
    // axios.post(`http://localhost:1007/question`,{
    //   teamId:"0",
    //   teamName:"y",
    //   boardId:"1",
    //   position:"2",
    //   pointsScored:20,
    //   isDiceRolled:true,
    //   NumberOnDice:"3",
    //   result:"4",
    //   blockColor:"RED",
    //   questionCounter:1
    // }).then((response)=>{
    //     console.log("in question res: ",response);
    //     });
    if(role == "Leader") 
     {
     axios.get(`http://localhost:1007/track/team/${id}`).then((response)=>{
      console.log("in dialog teamL: ",response);
      if(!response.data.leader) setError(true);
      else{
      console.log("dialog data: ",{role,id});
        props.setRole({role,id});
        props.setRoleSelection(false);
        setOpen(false);
      }
			});
  }
   else{ 
      console.log("dialog data: ",{role,id:-1});
        props.setRole({role,id:-1});
        props.setRoleSelection(false);
        setOpen(false);
   }
  };


  const handleClose = () => {
    props.setRoleSelection(false);
    setOpen(false);
  };

  const handleTextFieldChange = (e) => {
        setId(e.target.value);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Role selection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Leader ID 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="LeaderID"
            fullWidth
            onChange = {handleTextFieldChange}
          />
          {error && <Alert severity="error">Invalid Leader ID</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose1("Guest")} color="primary">
            Enter as Guest
          </Button>
          <Button variant="contained" onClick={() => handleClose1("Leader")} color="secondary">
            Enter as Leader
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}