import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
const NewBucketComponent = (props) => {
  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const {
    Transition,
    open,
    handleClose,
    title,
    onSave,
    bucketid,
    buckets,
    bucketname,
    bucketName,
  } = props;

  const [name, setName] = useState("");
  const onChange = (e) => {
    setName(e.target.value);
  };
  const onChangeSuggestion = (e) => {
    setName(e.target.innerText);
  };
  const handleSave = () => {
    let Payload = {};
    if (!bucketid) {
      Payload.name = name;
    } else {
      Payload.name = name;
      Payload.key = bucketid;
      Payload.is_completed = false;
      Payload.bucketname = bucketname;
    }
    onSave(Payload);
    setName("");
    handleClose();
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      className="cls-dialog"
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Grid item xs={10}>
            {/* <Input value={name} onChange={onChange} /> */}
            {buckets ? (
              <Autocomplete
                options={buckets.map((option) => option.name)}
                onChange={onChangeSuggestion}
                inputValue={name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    value={name}
                    onChange={onChange}
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            ) : (
              <Input value={name} onChange={onChange} />
            )}
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Icon onClick={handleSave} color="primary" className="clsRight">
          save
        </Icon>
      </DialogActions>
    </Dialog>
  );
};

export default NewBucketComponent;
