import React, { useState } from "react";
import Map from "./Map";
import Marker from "./Marker";
import { Wrapper } from "@googlemaps/react-wrapper";
import Environment from "../../constants/Environment";

const render = (status) => {
  return <h1>{status}</h1>;
};

const MapWrapper = () => {
  const [click, setClick] = useState({});
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const onClick = (e) => {
    setClick(e);
  };

  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  return (
    <div style={{ height: "600px", width: "600px" }}>
      <Wrapper apiKey={Environment.REACT_APP_GOOGLE_API_KEY} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          <Marker position={click.latLng} />
        </Map>
      </Wrapper>
      <button onClick={() => setClick({})}>Clear</button>
    </div>
  );
};

export default MapWrapper;
