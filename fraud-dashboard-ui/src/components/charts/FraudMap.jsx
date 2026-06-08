import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 

const cityCoordinates = {
    "Delhi": [28.7041, 77.1025],
    "Mumbai": [19.0760, 72.8777],
    "Bangalore": [12.9716, 77.5946],
    "Patna": [25.5941, 85.1376],
    "Gaya": [24.7914, 85.0002],
    "Hyderabad": [17.3850, 78.4867],
    "Chennai": [13.0827, 80.2707],
    "Kolkata": [22.5726, 88.3639],
    "Lucknow": [26.8467, 80.9462],
    "Kanpur": [26.4499, 80.3319],
    "Pune": [18.5204, 73.8567]
};

export const FraudMap = ({ cityData }) => {
    const maxFrauds = cityData?.length > 0 ? Math.max(...cityData.map(c => c.value)) : 1;

    return (
        <div className="h-full w-full rounded-lg overflow-hidden border border-dark-700 relative z-0">
            <MapContainer 
                center={[22.5937, 78.9629]} 
                zoom={4.5} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', background: '#0f172a' }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
                />
                
                {cityData?.map((city) => {
                    const coords = cityCoordinates[city.name];
                    if (!coords) return null;

                    const intensityRatio = city.value / maxFrauds;
                    
                    const radius = 4 + (intensityRatio * 8); 
                    
                    const opacity = 0.5 + (intensityRatio * 0.5); 
                    
                    const color = city.value === maxFrauds ? '#ef4444' : '#f59e0b';

                    return (
                        <CircleMarker
                            key={city.name}
                            center={coords}
                            radius={radius}
                            pathOptions={{
                                color: color,
                                fillColor: color,
                                fillOpacity: opacity,
                                weight: intensityRatio > 0.8 ? 2 : 1 // Slightly thinner border for smaller dots
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
                                <div className="text-center font-sans font-medium">
                                    <span className="block text-slate-800 font-bold mb-1">{city.name}</span>
                                    <span className="text-brand-danger text-sm">
                                        {city.value} Alerts
                                    </span>
                                </div>
                            </Tooltip>
                        </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
};