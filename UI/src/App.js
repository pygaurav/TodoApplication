import React from "react";
import "./styles.css";
import Grid from "@material-ui/core/Grid";
import MenuBarComponent from "./components/MenuBarComponent";
import TodoListComponent from "./components/todocomponents/TodoListComponent";
import BucketListComponent from "./components/bucketcomponents/BucketListComponent";
export default function App() {
  return (
    <div>
      <MenuBarComponent />
      <Grid container>
        <Grid item xs={12} md={5} className="heighMax">
          <BucketListComponent />
        </Grid>
        <Grid item xs={12} md={7}>
          <TodoListComponent />
        </Grid>
      </Grid>
    </div>
  );
}
