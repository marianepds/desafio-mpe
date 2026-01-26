import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import LocationForm from './components/LocationForm';
import LocationList from './components/LocationList';
import LocationMap from './components/LocationMap';
import type { Location, CreateLocationDto, UpdateLocationDto } from './types/location';
import { locationService } from './services/api';
import { AlertCircle, RefreshCw, Map as MapIcon, MapPin } from 'lucide-react';

function App() {
  // Estado principal
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');
  
  // Carregar localizações
  const loadLocations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await locationService.getAll(searchTerm);
      setLocations(data);
    } catch (err) {
      setError('Erro ao conectar com a API. Verifique se o backend está rodando.');
      console.error('Erro ao carregar localizações:', err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  // Carregar inicialmente
  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  // Criar nova localização
  const handleCreateLocation = async (data: CreateLocationDto) => {
    try {
      const newLocation = await locationService.create(data);
      setLocations(prev => [newLocation, ...prev]);
      setError(null);
      setSelectedLocation(null);
      
      // Feedback visual
      alert('Localização cadastrada com sucesso!');
    } catch (err: unknown) {
      let message = 'Erro ao cadastrar localização: ';
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
        message += err.response.data.message;
      } else if (err instanceof Error) {
        message += err.message;
      } else {
        message += 'Erro desconhecido';
      }
      setError(message);
    }
  };

  // Atualizar localização
  const handleUpdateLocation = async (data: UpdateLocationDto) => {
    if (!selectedLocation) return;
    
    try {
      await locationService.update(selectedLocation.id, data);
      await loadLocations(); // Recarregar lista atualizada
      setSelectedLocation(null);
      setError(null);
      
      // Feedback visual
      alert('Localização atualizada com sucesso!');
    } catch (err: unknown) {
      let message = 'Erro ao atualizar localização: ';
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
        message += err.response.data.message;
      } else if (err instanceof Error) {
        message += err.message;
      } else {
        message += 'Erro desconhecido';
      }
      setError(message);
    }
  };

  // Deletar localização
  const handleDeleteLocation = async (id: number) => {
    try {
      await locationService.delete(id);
      setLocations(prev => prev.filter(location => location.id !== id));
      setError(null);
      
      // Feedback visual
      alert('🗑️ Localização removida com sucesso!');
    } catch (err: unknown) {
      let message = 'Erro ao excluir localização: ';
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
        message += err.response.data.message;
      } else if (err instanceof Error) {
        message += err.message;
      } else {
        message += 'Erro desconhecido';
      }
      setError(message);
    }
  };

  // Visualizar localização no mapa
  const handleViewOnMap = (location: Location) => {
    setSelectedLocation(location);
    setActiveTab('map');
  };

  // Limpar seleção
  const handleCancelEdit = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Mensagens de erro/sucesso */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna esquerda: Formulário */}
          <div className="lg:col-span-1">
            <LocationForm
            onSubmit={async (data) => {
              if (selectedLocation) {
                // Força o tipo para UpdateLocationDto
                return handleUpdateLocation(data as UpdateLocationDto);
              } else {
                // Garante que name, latitude e longitude nunca serão undefined
                const { name, latitude, longitude } = data;
                if (latitude === undefined || longitude === undefined) {
                  setError('Latitude e longitude são obrigatórias.');
                  return Promise.resolve();
                }
                return handleCreateLocation({
                  name: name ?? '',
                  latitude,
                  longitude,
                });
              }
            }}
            initialData={selectedLocation || undefined}
            isEditing={!!selectedLocation}
            onCancel={selectedLocation ? handleCancelEdit : undefined}
          />
            {/* Stats */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Estatísticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{locations.length}</div>
                  <div className="text-sm text-gray-600">Localizações</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {selectedLocation ? 'Editando' : 'Pronto'}
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>
              <button
                onClick={loadLocations}
                disabled={isLoading}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Atualizando...' : 'Atualizar Lista'}
              </button>
            </div>
          </div>

          {/* Coluna direita: Lista e Mapa */}
          <div className="lg:col-span-2">
            {/* Tabs para mobile/tablet */}
            <div className="lg:hidden mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('list')}
                  className={`flex-1 py-3 text-center font-medium ${
                    activeTab === 'list'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <MapIcon className="w-4 h-4" />
                    Lista
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`flex-1 py-3 text-center font-medium ${
                    activeTab === 'map'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Mapa
                  </div>
                </button>
              </div>
            </div>

            {/* Conteúdo das tabs */}
            <div className="space-y-8">
              {/* Lista (sempre visível em desktop, condicional em mobile) */}
              <div className={activeTab === 'list' || window.innerWidth >= 1024 ? 'block' : 'hidden'}>
                <LocationList
                  locations={locations}
                  onEdit={setSelectedLocation}
                  onDelete={handleDeleteLocation}
                  onViewOnMap={handleViewOnMap}
                  isLoading={isLoading}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </div>

              {/* Mapa (sempre visível em desktop, condicional em mobile) */}
              <div className={activeTab === 'map' || window.innerWidth >= 1024 ? 'block' : 'hidden'}>
                <LocationMap
                  locations={locations}
                  onMarkerClick={setSelectedLocation}
                  height="500px"
                  zoom={13}
                />
              </div>
            </div>

            {/* Instruções */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-3">Como usar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-700 mb-1">1. Cadastrar</div>
                  <p className="text-gray-600">Preencha o formulário com nome e coordenadas</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-700 mb-1">2. Visualizar</div>
                  <p className="text-gray-600">Veja os pontos aparecerem na lista e no mapa</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-700 mb-1">3. Interagir</div>
                  <p className="text-gray-600">Clique nos marcadores para editar ou excluir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600">
              <p className="font-medium">Desafio Técnico - MPE Distribuidora</p>
              <p className="text-sm mt-1">API .NET + Frontend React com TypeScript</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>Desenvolvido com React, TypeScript, Tailwind CSS e Leaflet</p>
              <p className="mt-1">API REST com .NET 10, Entity Framework e PostgreSQL</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;