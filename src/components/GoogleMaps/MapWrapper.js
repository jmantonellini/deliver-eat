import React, { useEffect, useState } from "react";
import Map from "./Map";
import Marker from "./Marker";
import { Wrapper } from "@googlemaps/react-wrapper";
import Environment from "../../constants/Environment";

const render = (status) => {
  return <h1>{status}</h1>;
};

const MapWrapper = ({ geolocation, onMapClick = () => {} }) => {
  const [click, setClick] = useState({});
  const [zoom, setZoom] = useState(15); // initial zoom
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const newCenter = {
      lat: geolocation?.lat,
      lng: geolocation?.lng,
    };
    geolocation && setCenter(newCenter);
  }, [geolocation]);

  const onClick = (e) => {
    setClick(e);
    console.log("E", e.latLng);
    onMapClick(e?.latLng.toJSON());
  };

  const onIdle = (m) => {
    setZoom(m?.getZoom());
    setCenter(m?.getCenter()?.toJSON());
  };

  return (
    <div style={{ height: "300px", width: "300px" }}>
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
    </div>
  );
};

export default MapWrapper;
