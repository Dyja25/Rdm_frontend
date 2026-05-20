import React, { Component } from "react";
import _ from "lodash";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker issue in Vite/React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

class OrganizationDetailMap extends Component {
  render() {
    const position = [
      {
        lat: 51.92301029999999,
        lng: 4.470038700000032,
        name: "slack",
      },
    ];

    return (
      <MainWrapper style={{ padding: 0, overflowX:"hidden" }}>
        <MapContainer
          center={[51.92301029999999, 4.470038700000032]}
          zoom={9}
          style={{ height: "180px", width: "100%", margin: "5px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {position.map((p, i) => (
            <Marker key={i} position={[p.lat, p.lng]}>
              <Popup>{p.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </MainWrapper>
    );
  }
}

export default OrganizationDetailMap;
