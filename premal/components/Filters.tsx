import React from "react";

interface FiltersProps {
    showRenewables: boolean;
    setShowRenewables: (value: boolean) => void;
    showDemand: boolean;
    setShowDemand: (value: boolean) => void;
}

export default function Filters({
    showRenewables,
    setShowRenewables,
    showDemand,
    setShowDemand,
}: FiltersProps): JSX.Element {
    return (
        <div
            style={{
                position: "absolute",
                top: 30,
                right: 30,
                background: "white",
                padding: 10,
                zIndex: 1000,
                
            }}
        >
            <label>
                <input
                    type="checkbox"
                    checked={showRenewables}
                    onChange={(e) => setShowRenewables(e.target.checked)}
                />
                Renewables
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    checked={showDemand}
                    onChange={(e) => setShowDemand(e.target.checked)}
                />
                Demand Centers
            </label>
        </div>
    );
}
