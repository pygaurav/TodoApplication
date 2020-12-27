import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
const MenuBarComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          Todo Application
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBarComponent;
