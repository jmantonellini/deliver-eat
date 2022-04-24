import React, { useRef, useState } from "react";
import MapContainer from "../GoogleMaps/Map";

const PantallaPedido = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "500px",
        margin: "auto",
        height: "100%",
      }}
    >
      <MapContainer />
    </div>
  );
};

export default PantallaPedido;
