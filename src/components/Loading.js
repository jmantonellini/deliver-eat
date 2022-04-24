import React from "react";
import { Grid } from "@mui/material";
import "../assets/spinkit.css";

const Loading = ({ cube = false, grid = false, ...props }) => {
  return (
    <Grid container justify="center" alignItems="center" {...props}>
      {cube && (
        <div class="sk-folding-cube">
          <div class="sk-cube1 sk-cube" />
          <div class="sk-cube2 sk-cube" />
          <div class="sk-cube4 sk-cube" />
          <div class="sk-cube3 sk-cube" />
        </div>
      )}
      {grid && (
        <div class="sk-cube-grid">
          <div class="sk-cube sk-cube1" />
          <div class="sk-cube sk-cube2" />
          <div class="sk-cube sk-cube3" />
          <div class="sk-cube sk-cube4" />
          <div class="sk-cube sk-cube5" />
          <div class="sk-cube sk-cube6" />
          <div class="sk-cube sk-cube7" />
          <div class="sk-cube sk-cube8" />
          <div class="sk-cube sk-cube9" />
        </div>
      )}
    </Grid>
  );
};

export default Loading;
