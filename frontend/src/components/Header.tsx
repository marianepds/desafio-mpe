import React from 'react';
import { MapPin, Github, Linkedin, Mail } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#C4C3E3] to-[#8E8DB5] text-[#504E76] shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo e título */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                MPE MAPS
              </h1>
              <p className="text-[#504E76] mt-1">
                Sistema completo para cadastro e visualização geográfica
              </p>
            </div>
          </div>

          {/* Informações técnicas */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <div className="font-semibold text-[#504E76]">Backend</div>
                <div className="font-mono">.NET 10 + PostgreSQL</div>
              </div>
              <div>
                <div className="font-semibold text-[#504E76]">Frontend</div>
                <div className="font-mono">React + TypeScript</div>
              </div>
              <div>
                <div className="font-semibold text-[#504E76]">Mapas</div>
                <div className="font-mono">Leaflet + OpenStreetMap</div>
              </div>
            </div>
          </div>

          {/* Links sociais/contato */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/marianepds"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mariane-padilha-dos-santos-715464264"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:seu@email.com"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Status da aplicação */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <MapPin className="w-3 h-3" />
            <span className="text-sm">Santa Maria, RS</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;