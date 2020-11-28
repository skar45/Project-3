import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';


export default function FormDialog(props) {
  
  const [open, setOpen] = React.useState(false);
  const TextField = React.createRef();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    let Input = props.val
    Input.push(TextField.current.value)
    props.func(Input)
    setOpen(false);
  };

  return (
    <div>
        <Fab aria-label={props.label} className={props.className} color={props.color} onClick={handleClickOpen}>
            {props.icon}
        </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">To Do:</DialogTitle>
        <DialogContent>
          <input
            ref= {TextField}
            autoFocus
            margin="dense"
            id="name"
            label="To-Do:"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}