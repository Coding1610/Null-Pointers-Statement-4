import React from "react";
import MapView from "./components/MapView";

export default function AppNew(): JSX.Element {
    return (
        <div>
            <header
                style={{
                    background: "#16a34a",
                    color: "white",
                    padding: 10,
                    fontSize: 18,
                }}
            >
                🌍 Hydrogen Ecosystem Site Planner (Leaflet)
            </header>
            <MapView />
        </div>
    );
}