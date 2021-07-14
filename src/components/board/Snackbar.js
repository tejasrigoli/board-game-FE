import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars({teamName}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(()=>{
    setOpen(true);
  },[])

  return (
    <div >
      <Snackbar 
      style={{top: "-60%",width:"30%"}}
      open={open} 
      onClose={handleClose}
      >
        <Alert 
        style={{fontSize:"large"}}
        onClose={handleClose} 
        severity="info">
         {teamName}'s Turn
        </Alert>
      </Snackbar>
    </div>
  );
}
