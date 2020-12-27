import React, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
const BucketComponent = (props) => {
  const { values, editBucket, removeBucket, getTodo } = props;
  const { name, key, color } = values;
  const [bucketName, setBucketName] = useState("");
  useEffect(() => {
    setBucketName(name);
  }, []);
  const onChange = (e) => {
    setBucketName(e.target.value);
  };
  const payload = {
    key: key,
    name: bucketName
  };
  const onSave = () => {
    editBucket(payload);
  };
  const onDelete = () => {
    removeBucket(payload);
  };
  const onNavigate = () => {
    getTodo(payload);
  };
  return (
    <li>
      <Grid container style={{background:color}}>
        <Grid item xs={9}>
          <Input
            onChange={onChange}
            className="clsWidthInputTodo"
            value={bucketName}
          />
        </Grid>
        <Grid item xs={3}>
          <Icon onClick={onSave} color="primary" className="clsRight">
            save
          </Icon>
          <Icon onClick={onDelete} className="cls-icon" color="primary">
            delete
          </Icon>
          <Icon onClick={onNavigate} className="cls-icon" color="primary">
            arrow_forward_ios
          </Icon>
        </Grid>
      </Grid>
    </li>
  );
};

export default BucketComponent;
