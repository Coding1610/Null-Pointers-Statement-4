import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface MarkerData {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

interface MarkerLayerProps {
    data: MarkerData[];
    color: string;
}

// Function to create a triangle-shaped icon
const createTriangleIcon = (color: string): L.DivIcon => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22">
            <polygon points="11,2 21,20 1,20" fill="${color}" stroke="white" stroke-width="2"/>
        </svg>
    `;

    return L.divIcon({
        html: svg,
        className: "", // prevent default styles
        iconSize: [22, 22],
        iconAnchor: [11, 20], // base of triangle sits on map point
    });
};

export default function MarkerLayer({ data, color }: MarkerLayerProps): JSX.Element {
    return (
        <>
            {data.map((item) => {
                const icon = createTriangleIcon(color);
                return (
                    <Marker
                        key={item.id}
                        position={[item.latitude, item.longitude]}
                        icon={icon}
                    >
                        <Popup>{item.name}</Popup>
                    </Marker>
                );
            })}
        </>
    );
}
