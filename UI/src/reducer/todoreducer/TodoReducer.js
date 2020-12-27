import {
  GET_BUCKET,
  EDIT_BUCKET,
  REMOVE_BUCKET,
  ADD_BUCKET,
  GET_TODO,
  ADD_TODO,
  EDIT_TODO,
  REMOVE_TODO,
  ACTION_TODO,
} from "../todoreducer/types";

const initialState = {
  todo: [],
  buckets: [],
  selectedbucket: "",
  selectedbucketid: 0,
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUCKET:
      return {
        ...state,
        buckets: action.payload,
      };
    case EDIT_BUCKET:
      state.buckets.forEach((e) => {
        if (e.key === action.payload.key) {
          e.name = action.payload.name;
        }
      });
      return {
        ...state,
        buckets: state.buckets,
      };
    case REMOVE_BUCKET:
      return {
        ...state,
        buckets: state.buckets.filter((e) => {
          return e.key !== action.payload.key;
        }),
        todo: [],
        selectedbucket: "",
        selectedbucketid: 0
      };
    case ADD_BUCKET:
      let bucketlength = state.buckets.length;
      return {
        ...state,
        buckets: [
          ...state.buckets,
          {
            key: bucketlength + 1,
            name: "",
          },
        ],
      };
    case GET_TODO:
      return {
        ...state,
        todo: action.payload,
        selectedbucket: action.selectedbucket,
        selectedbucketid: action.selectedbucketid,
      };
    case ADD_TODO:
      let todolength = state.todo.length;
      return {
        ...state,
        todo: [
          ...state.todo,
          {
            key: todolength + 1,
            name: "",
            isCompleted: false,
          },
        ],
      };
    case EDIT_TODO:
      state.todo.forEach((e) => {
        if (
          e.key === action.payload.key &&
          state.selectedbucketid === action.payload.selectedbucketid
        ) {
          e.name = action.payload.name;
        }
      });
      return {
        ...state,
        todo: state.todo,
      };
    case REMOVE_TODO:
      return {
        ...state,
        todo: state.todo.filter((e) => {
          return (
            e.key !== action.payload.key &&
            state.selectedbucketid === action.payload.selectedbucketid
          );
        }),
      };
    case ACTION_TODO:
      return {
        ...state,
        todo: state.todo.map((e) => {
          let obj =
            e.key === action.payload.key &&
            state.selectedbucketid === action.payload.selectedbucketid
              ? action.payload
              : e;
          return obj;
        }),
      };
    default:
      return state;
  }
};

export default TodoReducer;
