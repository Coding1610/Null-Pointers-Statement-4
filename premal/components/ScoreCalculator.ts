// ScoreCalculator.ts

export interface Site {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    score?: number;
}

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

interface Weights {
    renewable: number;
    demand: number;
    regulatory: number;
}

interface Point {
    latitude: number;
    longitude: number;
}

export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function isInsidePolygon(point: Point, polygon: number[][]): boolean {
    const x = point.longitude;
    const y = point.latitude;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][1], yi = polygon[i][0];
        const xj = polygon[j][1], yj = polygon[j][0];
        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
}

export function scoreCandidateSite(
    site: Site, 
    renewables: RenewableSite[], 
    demandCenters: DemandCenter[], 
    regulatoryZones: RegulatoryZone[], 
    weights: Weights
): Site {
    const minRenewableDistance = Math.min(
        ...renewables.map(r => getDistanceKm(site.latitude, site.longitude, r.latitude, r.longitude))
    );
    const renewableScore = 1 / (1 + minRenewableDistance);

    const minDemandDistance = Math.min(
        ...demandCenters.map(d => getDistanceKm(site.latitude, site.longitude, d.latitude, d.longitude))
    );
    const demandScore = 1 / (1 + minDemandDistance);

    let regulatoryScore = 0;
    for (let zone of regulatoryZones) {
        if (isInsidePolygon(site, zone.coordinates)) {
            regulatoryScore = zone.type === "permitted" ? 1 : 0;
            break;
        }
    }

    const totalScore =
        weights.renewable * renewableScore +
        weights.demand * demandScore +
        weights.regulatory * regulatoryScore;

    return { ...site, score: totalScore };
}

export function rankSites(
    candidateSites: Site[], 
    renewables: RenewableSite[], 
    demandCenters: DemandCenter[], 
    regulatoryZones: RegulatoryZone[]
): Site[] {
    const weights: Weights = { renewable: 0.4, demand: 0.4, regulatory: 0.2 };
    const scoredSites = candidateSites.map(site =>
        scoreCandidateSite(site, renewables, demandCenters, regulatoryZones, weights)
    );
    scoredSites.sort((a, b) => (b.score || 0) - (a.score || 0));
    return scoredSites;
}
