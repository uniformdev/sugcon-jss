import React from "react";
import { Text, RichText, Image, Link } from "@sitecore-jss/sitecore-jss-react";
import RouterLink from "../../atoms/RouterLink";
import GoogleMapReact from "google-map-react";

import "./style.css";

const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

const MapBlock = ({ fields }) => {
  if (!fields) {
    return null;
  }

  const { title, lat, lng } = fields;
  const latitude = parseFloat(lat?.value);
  const longitude = parseFloat(lng?.value);
  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 11,
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
        <Text
          tag="h1"
          field={title}
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
        />
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
        </div>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marker lat={latitude} lng={longitude} text={"SUGCON 2021"} />
          </GoogleMapReact>
        </div>
      </div>
    </section>
  );
};

export default MapBlock;
