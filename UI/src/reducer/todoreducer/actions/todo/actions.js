import { GET_TODO, EDIT_TODO, REMOVE_TODO, ACTION_TODO } from "../../types";
import axios from "../../../../axios-instance";

const getTodo = (res) => {
  return {
    type: GET_TODO,
    payload: res.payload,
    selectedbucket: res.selectedbucket,
    selectedbucketid: res.selectedbucketid,
  };
};
const getAsyncTodo = (res) => {
  return (dispatch) => {
    axios
      .get(`/todobucket/${res.key}`)
      .then((e) => {
        let results = e.data.data;
        let payload = [];
        results.forEach((e) => {
          let data = {};
          data = {
            key: e.id,
            name: e.name,
            isCompleted: e.is_completed,
            bucketId: e.bucket_id
          };
          payload.push(data);
        });
        let finalPayload = {
          selectedbucketid: res.key,
          selectedbucket: res.name,
          payload: payload
        };
        dispatch(getTodo(finalPayload));
      })
      .catch((e) => {});
  };
};

const addAsyncTodo = (res) => {
  return (dispatch) => {
    let Payload = { ...res };
    Payload.bucket_id = Payload.key;
    delete Payload.bucketname;
    delete Payload.key;
    let afterEffectsPayload = { ...res };
    afterEffectsPayload.name = afterEffectsPayload.bucketname;
    delete afterEffectsPayload.is_completed;
    delete afterEffectsPayload.bucketname;
    axios
      .post("/todo", Payload)
      .then((d) => {
        dispatch(getAsyncTodo(afterEffectsPayload));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const editTodo = (res) => {
  return {
    type: EDIT_TODO,
    payload: res
  };
};
const editAsyncTodo = (res) => {
  return (dispatch) => {
    let Payload = {};
    Payload.bucket_id = res.selectedbucketid;
    Payload.name = res.name;
    Payload.id = res.key;
    console.log(Payload);
    axios
      .put("/todos", Payload)
      .then((d) => {
        dispatch(editTodo(res));
      })
      .catch((e) => {});
  };
};
const removeTodo = (res) => {
  return {
    type: REMOVE_TODO,
    payload: res
  };
};
const removeAsyncTodo = (res) => {
  return (dispatch) => {
    axios
      .delete(`todo/${res.key}`)
      .then(() => {
        dispatch(removeTodo(res));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const actionTodo = (res) => {
  return {
    type: ACTION_TODO,
    payload: res
  };
};
const actionAsyncTodo = (res) => {
  return (dispatch, getState) => {
    let Payload = {};
    Payload.is_completed = res.isCompleted;
    Payload.id = res.key;
    axios
      .put("/todo", Payload)
      .then((d) => {
        dispatch(actionTodo(res));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export {
  getAsyncTodo,
  addAsyncTodo,
  editAsyncTodo,
  removeAsyncTodo,
  actionAsyncTodo
};
