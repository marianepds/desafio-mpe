import { useState, useEffect } from 'react';
import Header from './components/Header';
import LocationForm from './components/LocationForm';
import LocationMap from './components/LocationMap';
import LocationList from './components/LocationList';

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const API_URL = 'http://localhost:5226/api/locations';

function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setLocations(data);
    } catch (error) {
      console.error('Erro ao carregar:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleCreate = async (formData: Omit<Location, 'id'>) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      await fetchLocations(); // Recarrega
    } catch {
      alert('Erro ao criar');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      await fetchLocations(); // Recarrega
    } catch {
      alert('Erro ao excluir');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário */}
          <div className="lg:col-span-1">
            <LocationForm onSubmit={handleCreate} />
          </div>
          
          {/* Mapa e Lista */}
          <div className="lg:col-span-2 space-y-6">
            <LocationMap locations={locations} height="400px" />
            <LocationList
              locations={locations}
              isLoading={loading}
              onEdit={() => alert('Editar - implemente se precisar')}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;