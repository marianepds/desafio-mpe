import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Location {
  id: string | number;
  Latitude?: number | string;
  latitude?: number | string;
  Longitude?: number | string;
  longitude?: number | string;
  Name?: string;
  name?: string;
  Description?: string;
  description?: string;
}

interface LocationMapProps {
  locations: Location[];
  height?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  locations,
  height = '500px',
}) => {
  // Normaliza coordenadas (resolve maiúsculo/minúsculo)
  const getCoords = (loc: Location) => {
    const lat = loc.Latitude || loc.latitude || -29.6842;
    const lng = loc.Longitude || loc.longitude || -53.8069;
    
    // Converte string com vírgula para número
    const parseCoord = (coord: number | string) => {
      if (typeof coord === 'number') return coord;
      if (typeof coord === 'string') return parseFloat(coord.replace(',', '.'));
      return 0;
    };
    
    return [parseCoord(lat), parseCoord(lng)];
  };

  // Centro do mapa (Santa Maria, RS como fallback)
  const center: [number, number] = [-29.6842, -53.8069];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#504E76]" />
          <h3 className="text-lg font-semibold">Mapa</h3>
        </div>
      </div>
      
      <div style={{ height }}>
        <MapContainer
          center={center}
          zoom={13}
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {locations.map((location) => {
            const position = getCoords(location) as [number, number];
            
            return (
              <Marker key={location.id} position={position}>
                <Popup>
                  <div className="p-2">
                    <h4 className="font-bold">{location.Name || location.name || 'Sem nome'}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {position[0].toFixed(6)}, {position[1].toFixed(6)}
                    </p>
                    {location.Description || location.description ? (
                      <p className="text-sm mt-2">
                        {location.Description || location.description}
                      </p>
                    ) : null}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationMap;