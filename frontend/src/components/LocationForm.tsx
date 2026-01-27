import React, { useState } from 'react';
import { MapPin, Save, X } from 'lucide-react';
import type { CreateLocationDto, UpdateLocationDto } from '../types/location';

interface LocationFormProps {
  onSubmit: (data: CreateLocationDto | UpdateLocationDto) => Promise<void>;
  initialData?: CreateLocationDto;
  isEditing?: boolean;
  onCancel?: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ 
  onSubmit, 
  initialData, 
  isEditing = false,
  onCancel 
}) => {
  const [formData, setFormData] = useState<CreateLocationDto>(
    initialData || {
      name: '',
      latitude: -29.6842, 
      longitude: -53.8069,
      description: '',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Nome deve ter no máximo 100 caracteres';
    }

    if (formData.latitude < -90 || formData.latitude > 90) {
      newErrors.latitude = 'Latitude deve estar entre -90 e 90';
    }

    if (formData.longitude < -180 || formData.longitude > 180) {
      newErrors.longitude = 'Longitude deve estar entre -180 e 180';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Descrição deve ter no máximo 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      
      if (!isEditing) {
        setFormData({
          name: '',
          latitude: -29.6842,
          longitude: -53.8069,
          description: '',
        });
      }
    } catch (error) {
      console.error('Erro ao salvar localização:', error);
      alert('Erro ao salvar localização. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' 
        ? parseFloat(value) || 0 
        : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-6 h-6 text-[#504E76]" />
        <h2 className="text-xl font-bold text-[#504E76]">
          {isEditing ? 'Editar Localização' : 'Nova Localização'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: Parque Itaimbé"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude *
            </label>
            <input
              type="number"
              name="latitude"
              step="0.000001"
              value={formData.latitude}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.latitude ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="-29.6842"
              disabled={isSubmitting}
            />
            {errors.latitude && (
              <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude *
            </label>
            <input
              type="number"
              name="longitude"
              step="0.000001"
              value={formData.longitude}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.longitude ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="-53.8069"
              disabled={isSubmitting}
            />
            {errors.longitude && (
              <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="Descrição do local..."
            maxLength={500}
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">
              {formData.description?.length || 0}/500 caracteres
            </span>
            <span className="text-xs text-gray-500">
              Coordenadas padrão: Santa Maria, Rio Grande do Sul
            </span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 bg-[#C4C3E3] hover:bg-[#C4C3E3]/20 text-[#504E76] font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Salvando...' : isEditing ? 'Atualizar' : 'Cadastrar'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LocationForm;