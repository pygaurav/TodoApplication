import { GET_BUCKET, EDIT_BUCKET, REMOVE_BUCKET } from "../../types";
import axios from "../../../../axios-instance";
import colorGenerator from '../../../../utils/GenerateColor'
const cleanUpGetPayload = (inputPayload) => {
  inputPayload.forEach((e) => {
    e.key = e.id;
    delete e.id;
  });
};

const cleanUpPostPayload = (inputPayload) => {
  let payload = { ...inputPayload };
  payload.id = payload.key;
  delete payload.key;
  return payload;
};

const getBucket = (res) => {
  return {
    type: GET_BUCKET,
    payload: res
  };
};
const getAsyncBucket = () => {
  return (dispatch) => {
    axios
      .get("/bucket")
      .then((d) => {
        cleanUpGetPayload(d.data.data);
        dispatch(getBucket(d.data.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const addAsyncBucket = (res) => {
  return (dispatch) => {
    res.color = colorGenerator()
    axios
      .post("/bucket", res)
      .then((d) => {
        dispatch(getAsyncBucket());
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const editBucket = (res) => {
  return {
    type: EDIT_BUCKET,
    payload: res
  };
};
const editAsyncBucket = (res) => {
  return (dispatch) => {
    let putdata = cleanUpPostPayload(res);
    axios
      .put("/bucket", putdata)
      .then((d) => {
        dispatch(editBucket(res));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const removeBucket = (res) => {
  return {
    type: REMOVE_BUCKET,
    payload: res
  };
};
const removeAsyncBucket = (res) => {
  return (dispatch) => {
    axios
      .delete(`/bucket/${res.key}`)
      .then((d) => {
        dispatch(removeBucket(res));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export { getAsyncBucket, addAsyncBucket, editAsyncBucket, removeAsyncBucket };
