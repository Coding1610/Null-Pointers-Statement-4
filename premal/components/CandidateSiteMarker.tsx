import React from "react";
import { Marker, Popup } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import { Site } from "./ScoreCalculator";

// Define the props for the component
interface CandidateSiteMarkerProps {
  site: Site & { score: number };
  threshold?: number;
}

// Utility to generate colored circle icons
const createIcon = (color: string): DivIcon =>
  L.divIcon({
    html: `<div style="background:${color};
                     width:16px;height:16px;
                     border-radius:50%;
                     border:2px solid white"></div>`,
    className: "", // removes default marker styles
    iconSize: [16, 16],
  });

const CandidateSiteMarker: React.FC<CandidateSiteMarkerProps> = ({
  site,
  threshold = 0.4,
}) => {
  const color = site.score >= threshold ? "green" : "red";

  return (
    <Marker position={[site.latitude, site.longitude]} icon={createIcon(color)}>
      <Popup>
        <b>{site.name}</b> <br /> Score: {site.score.toFixed(2)}
      </Popup>
    </Marker>
  );
};

export default CandidateSiteMarker;
