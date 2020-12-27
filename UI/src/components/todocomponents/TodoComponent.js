import React, { Fragment, useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
const TodoComponent = (props) => {
  const { value, editTodo, removeTodo, actionTodo, selectedbucketid } = props;
  const { key, name, isCompleted } = value;
  const [todoname, setTodoName] = useState("");
  useEffect(() => {
    setTodoName(name);
    //eslint-disable-next-line
  }, []);
  const onChangeInput = (e) => {
    setTodoName(e.target.value);
  };
  const payload = {
    key: key,
    name: todoname,
    selectedbucketid: selectedbucketid
  };
  const onClickSave = () => {
    editTodo(payload);
  };
  const onClickDelete = () => {
    removeTodo(payload);
  };
  const onClickCheckBox = (e) => {
    const newpayload = { ...payload };
    newpayload.isCompleted = e.target.checked;
    actionTodo(newpayload);
  };
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={10}>
          <Checkbox
            checked={isCompleted}
            onChange={onClickCheckBox}
            inputProps={{ "aria-label": "primary checkbox" }}
          />

          <Input
            onChange={onChangeInput}
            value={todoname}
            className="clsWidthInputTodo"
          />
        </Grid>
        <Grid item xs={2}>
          <Icon onClick={onClickSave} className="cls-icon" color="primary">
            save
          </Icon>
          <Icon onClick={onClickDelete} className="cls-icon" color="primary">
            delete
          </Icon>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default TodoComponent;
