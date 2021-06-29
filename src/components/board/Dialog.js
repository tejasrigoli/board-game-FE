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