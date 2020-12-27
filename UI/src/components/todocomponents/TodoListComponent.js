import React, { Fragment } from "react";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import TodoComponent from "./TodoComponent";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  addAsyncTodo,
  editAsyncTodo,
  removeAsyncTodo,
  actionAsyncTodo
} from "../../reducer/todoreducer/actions/todo/actions";
import NewTodoListComponent from "../shared/NewItemComponent";
import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TodoListComponent = (props) => {
  const {
    todo,
    selectedbucket,
    addTodo,
    actionTodo,
    editTodo,
    removeTodo,
    selectedbucketid
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createText = "Create New Todo";
  return (
    <div className="clsTodoComp">
      {selectedbucket ? (
        <Typography variant="h4" component="h2">
          Todo {selectedbucket} - {todo.length} Items
        </Typography>
      ) : null}
      <div className="margTodoApp">
        {todo
          ? todo.map((e) => {
              return (
                <TodoComponent
                  key={e.key}
                  selectedbucketid={selectedbucketid}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                  actionTodo={actionTodo}
                  value={e}
                />
              );
            })
          : null}
        {selectedbucket ? (
          <Fragment>
            <Icon
              onClick={handleClickOpen}
              color="primary"
              className="clsRight"
              style={{ fontSize: 50 }}
            >
              add
            </Icon>
            <Grid item xs={10}>
            <NewTodoListComponent
              Transition = {Transition}
              open = {open}
              title={createText}
              handleClose={handleClose}
              onSave={addTodo}
              bucketid={selectedbucketid}
              bucketname={selectedbucket}
            /> </Grid>
          </Fragment>
         
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todo: state.todo.todo,
    selectedbucket: state.todo.selectedbucket,
    selectedbucketid: state.todo.selectedbucketid
  };
};

const mapActionToProps = (dispatch) => {
  return {
    addTodo: (res) => {
      dispatch(addAsyncTodo(res));
    },
    editTodo: (res) => {
      dispatch(editAsyncTodo(res));
    },
    removeTodo: (res) => {
      dispatch(removeAsyncTodo(res));
    },
    actionTodo: (res) => {
      dispatch(actionAsyncTodo(res));
    }
  };
};

export default connect(mapStateToProps, mapActionToProps)(TodoListComponent);
