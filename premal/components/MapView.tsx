import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerLayer from "./MarkerLayer";
import CandidateSiteMarker from "./CandidateSiteMarker";
import Filters from "./Filters";
import { rankSites, type Site } from "./ScoreCalculator";

import candidateSitesData from "../data/candidateSites.json";
import renewablesData from "../data/renewable.json";
import demandCentersData from "../data/demandCenters.json";
import regulatoryZonesData from "../data/regulatoryZones.json";

interface RenewableSite {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

interface DemandCenter {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

interface RegulatoryZone {
    id: number;
    name: string;
    type: string;
    coordinates: number[][];
}

export default function MapView(): JSX.Element {
    const [rankedSites] = useState<(Site & { score: number })[]>(() =>
        rankSites(candidateSitesData, renewablesData, demandCentersData, regulatoryZonesData)
            .filter((site): site is Site & { score: number } => site.score !== undefined)
    );

    const [showRenewables, setShowRenewables] = useState<boolean>(true);
    const [showDemand, setShowDemand] = useState<boolean>(true);

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <MapContainer
                center={[28.6, 77.2]}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {showRenewables && <MarkerLayer data={renewablesData} color="yellow" />}
                {showDemand && <MarkerLayer data={demandCentersData} color="blue" />}
                {rankedSites.map((site) => (
                    <CandidateSiteMarker key={site.id} site={site} />
                ))}
            </MapContainer>
            <Filters
                showRenewables={showRenewables}
                setShowRenewables={setShowRenewables}
                showDemand={showDemand}
                setShowDemand={setShowDemand}
            />
        </div>
    );
}