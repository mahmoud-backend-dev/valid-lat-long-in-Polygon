export function isPointInPolygon(latitude: number, longitude: number, polygon: Array<Location>): boolean {
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    throw new TypeError('Invalid latitude or longitude. Numbers are expected');
  } else if (!polygon || !Array.isArray(polygon)) {
    throw new TypeError('Invalid polygon. Array with locations expected');
  } else if (polygon.length === 0) {
    throw new TypeError('Invalid polygon. Non-empty Array expected');
  }

  const x = latitude;
  const y = longitude;

  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].latitude;
    const yi = polygon[i].longitude;
    const xj = polygon[j].latitude;
    const yj = polygon[j].longitude;

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}
