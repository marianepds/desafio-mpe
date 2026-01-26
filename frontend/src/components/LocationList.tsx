import React from 'react';
import type { Location } from '../types/location';
import { Edit, Trash2, MapPin, Calendar, Navigation, Plus, ArrowRight } from 'lucide-react';

interface LocationListProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (id: number) => void;
  onViewOnMap?: (location: Location) => void;
  isLoading?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const LocationList: React.FC<LocationListProps> = ({
  locations,
  onEdit,
  onDelete,
  onViewOnMap,
  isLoading = false,
  searchTerm = '',
  onSearchChange,
}) => {
  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta localização?')) {
      onDelete(id);
    }
  };

  if (isLoading) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col items-center justify-center py-12">
        {/* Spinner animado com gradiente */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent border-r-transparent"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 rounded-full animate-spin border-l-transparent border-b-transparent opacity-70" style={{ animationDelay: '0.1s' }}></div>
        </div>
        
        {/* Texto com efeito de pulso */}
        <p className="text-gray-700 font-medium animate-pulse">
          Buscando localizações no mapa...
        </p>
        
        {/* Dots animados */}
        <div className="flex gap-1 mt-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

  if (locations.length === 0) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center py-12">
        {/* Ícone com gradiente e animação sutil */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl mb-6 mx-auto animate-pulse">
          <div className="relative">
            <MapPin className="w-12 h-12 text-blue-500" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Mapa esperando por você!
        </h3>
        
        {/* Descrição mais envolvente */}
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Este mapa está vazio, mas pronto para receber suas localizações! 
          Cadastre pontos de interesse, endereços importantes ou qualquer 
          lugar que queira marcar no mundo.
        </p>
        
        {/* Call to action bonito */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Primeiro passo</div>
              <div className="text-sm text-gray-600">Use o formulário ao lado</div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-500 hidden sm:block" />
          <div className="text-sm text-blue-600 font-medium bg-white px-4 py-2 rounded-full shadow-sm">
            Comece agora mesmo!
          </div>
        </div>
        
        {/* Dica extra */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Dica:</span> Use coordenadas de Santa Maria, RS 
            ou qualquer lugar do planeta!
          </p>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 border-b bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Localizações Cadastradas
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {locations.length} {locations.length === 1 ? 'item' : 'itens'} no total
            </p>
          </div>
          
          {onSearchChange && (
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Lista */}
      <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
        {locations.map((location) => (
          <div
            key={location.id}
            className="p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {location.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <Navigation className="w-3 h-3" />
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(location.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        ID: {location.id}
                      </span>
                    </div>
                  </div>
                </div>

                {location.description && (
                  <p className="text-gray-600 mt-3 line-clamp-2">
                    {location.description}
                  </p>
                )}

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">Latitude</div>
                    <div className="font-mono text-gray-800 bg-gray-50 p-2 rounded">
                      {location.latitude}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Longitude</div>
                    <div className="font-mono text-gray-800 bg-gray-50 p-2 rounded">
                      {location.longitude}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                <button
                  onClick={() => onEdit(location)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                
                {onViewOnMap && (
                  <button
                    onClick={() => onViewOnMap(location)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  >
                    <MapPin className="w-4 h-4" />
                    Ver no mapa
                  </button>
                )}
                
                <button
                  onClick={() => handleDelete(location.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
              </div>
            </div>

            {/* Data de atualização */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  Criado em: {new Date(location.createdAt).toLocaleString('pt-BR')}
                </span>
                <span>
                  Atualizado em: {new Date(location.updatedAt).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Mostrando {locations.length} de {locations.length} localizações
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Clique em "Ver no mapa" para centralizar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationList;