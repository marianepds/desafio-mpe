import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Location } from '../types/location';
import { createCustomIcon, calculateMapCenter } from '../services/mapService';
import { MapPin, Info } from 'lucide-react';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LocationMapProps {
  locations: Location[];
  onMarkerClick?: (location: Location) => void;
  height?: string;
  zoom?: number;
}

const LocationMap: React.FC<LocationMapProps> = ({
  locations,
  onMarkerClick,
  height = '500px',
  zoom = 13,
}) => {
  // Calcular centro do mapa
  const center = calculateMapCenter(locations);
  
  const customIcon = L.divIcon(createCustomIcon('#3b82f6') as L.DivIconOptions);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Mapa Interativo</h3>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              {locations.length} localizações
            </span>
            <span className="flex items-center gap-1">
              <Info className="w-4 h-4" />
              Clique nos marcadores para detalhes
            </span>
          </div>
        </div>
      </div>
      
      <div 
        className="relative"
        style={{ height }}
      >
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={zoom}
          className="w-full h-full"
          scrollWheelZoom={true}
          attributionControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={customIcon}
              eventHandlers={{
                click: () => onMarkerClick && onMarkerClick(location),
              }}
            >
              <Popup>
                <div className="p-3 min-w-[250px]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">
                        {location.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          ID: {location.id}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(location.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onMarkerClick && onMarkerClick(location)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {location.description && (
                    <p className="mt-3 text-gray-600 text-sm">
                      {location.description}
                    </p>
                  )}
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Latitude:</span>
                      <div className="font-mono text-gray-800">
                        {location.latitude.toFixed(6)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Longitude:</span>
                      <div className="font-mono text-gray-800">
                        {location.longitude.toFixed(6)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t">
                    <button
                      onClick={() => onMarkerClick && onMarkerClick(location)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-sm text-gray-700">
            <div className="font-medium mb-1">Controles do mapa:</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Marcador de localização</span>
              </div>
              <div>• Scroll: Zoom in/out</div>
              <div>• Arraste: Mover mapa</div>
              <div>• Clique no marcador: Detalhes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;