import React from 'react';
import { Edit, Trash2, MapPin, Calendar, Navigation } from 'lucide-react';

interface Location {
  id?: number;
  Id?: number;
  Name?: string;
  name?: string;
  Latitude?: number | string;
  latitude?: number | string;
  Longitude?: number | string;
  longitude?: number | string;
  Description?: string;
  description?: string;
  CreatedAt?: string;
  createdAt?: string;
  UpdatedAt?: string;
  updatedAt?: string;
  // Add other fields as needed
}

interface LocationListProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const LocationList: React.FC<LocationListProps> = ({
  locations,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  // Função universal para pegar qualquer propriedade (maiúsculo/minúsculo)
  const getProp = (obj: Location, ...keys: (string | number)[]): string | number => {
    for (const key of keys) {
      if ((obj as Record<string, unknown>)[key] !== undefined && (obj as Record<string, unknown>)[key] !== null) {
        return String((obj as Record<string, unknown>)[key]);
      }
    }
    return '';
  };

  const handleDelete = (loc: Location) => {
    const id = getProp(loc, 'id', 'Id');
    const name = getProp(loc, 'Name', 'name');
    
    if (id && window.confirm(`Excluir "${name || 'localização'}"?`)) {
      onDelete(Number(id));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/20 rounded-xl shadow p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C4C3E3] mx-auto"></div>
        <p className="mt-4 text-[#504E76]">Carregando localizações...</p>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <div className="w-16 h-16 bg-[#504E76]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-[#504E76]" />
        </div>
        <h3 className="text-lg font-semibold text-[#504E76]">Nenhuma localização</h3>
        <p className="text-gray-600 mt-2">Use o formulário para adicionar pontos no mapa</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 border-b bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-[#504E76]">Localizações Cadastradas</h3>
            <p className="text-sm text-gray-600 mt-1">{locations.length} itens no total</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
        {locations.map((loc) => {
          const id = getProp(loc, 'id', 'Id');
          const name = getProp(loc, 'Name', 'name');
          const lat = getProp(loc, 'Latitude', 'latitude', 0);
          const lng = getProp(loc, 'Longitude', 'longitude', 0);
          const description = getProp(loc, 'Description', 'description');
          const createdAt = getProp(loc, 'CreatedAt', 'createdAt', new Date().toISOString());
          const updatedAt = getProp(loc, 'UpdatedAt', 'updatedAt', new Date().toISOString());

          // Converte para número se for string com vírgula
          const latNum = typeof lat === 'string' ? parseFloat(lat.replace(',', '.')) : lat;
          const lngNum = typeof lng === 'string' ? parseFloat(lng.replace(',', '.')) : lng;

          return (
            <div key={id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#504E76]" />
                        {name || `Localização ${id}`}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          <Navigation className="w-3 h-3" />
                          {typeof latNum === 'number' ? latNum.toFixed(4) : '0.0000'}, 
                          {typeof lngNum === 'number' ? lngNum.toFixed(4) : '0.0000'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(createdAt as string).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          ID: {String(id)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {typeof description === 'string' && description && (
                    <p className="text-gray-600 mt-3 line-clamp-2">{description}</p>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">Latitude</div>
                      <div className="font-mono text-[#504E76] bg-gray-50 p-2 rounded">
                        {typeof latNum === 'number' && !isNaN(latNum) ? latNum : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Longitude</div>
                      <div className="font-mono text-[#504E76] bg-gray-50 p-2 rounded">
                        {typeof lngNum === 'number' && !isNaN(lngNum) ? lngNum : 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Criado: {new Date(createdAt as string).toLocaleString('pt-BR')}</span>
                      <span>Atualizado: {new Date(updatedAt as string).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                  <button
                    onClick={() => onEdit(loc)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  
                  <button
                    onClick={() => handleDelete(loc)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="text-sm text-gray-600">
          <span>Mostrando {locations.length} localizações</span>
          <div className="mt-1 text-xs">
            Clique em "Excluir" para remover ou "Editar" para modificar
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationList;