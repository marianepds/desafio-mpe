Sistema de Gerenciamento de Localizações



Aplicação fullstack para cadastro e visualização de pontos de interesse em mapa interativo, desenvolvida como parte de desafio técnico.



Tecnologias Utilizadas



Backend:

\- \*\*.NET 10.0\*\* - Framework principal

\- \*\*ASP.NET Core Web API\*\* - API RESTful

\- \*\*Entity Framework Core 10.0\*\* - ORM

\- \*\*PostgreSQL\*\* - Banco de dados

\- \*\*Swagger/OpenAPI\*\* - Documentação da API

\- \*\*NUnit\*\* - Testes de integração



Frontend:

\- \*\*React 19\*\* - Biblioteca UI

\- \*\*TypeScript\*\* - Tipagem estática

\- \*\*Vite\*\* - Build tool e dev server

\- \*\*Tailwind CSS 4\*\* - Estilização

\- \*\*React Leaflet\*\* - Integração com mapas

\- \*\*Lucide React\*\* - Ícones

\- \*\*Axios\*\* - Cliente HTTP







Pré-requisitos



\- \[.NET 10 SDK](https://dotnet.microsoft.com/download)

\- \[Node.js 18+](https://nodejs.org/)

\- \[PostgreSQL 14+](https://www.postgresql.org/download/)





Configuração e Instalação



Banco de Dados:



Crie um banco PostgreSQL:



CREATE DATABASE locationdb;

CREATE USER postgres WITH PASSWORD 'sua\_senha';

GRANT ALL PRIVILEGES ON DATABASE locationdb TO postgres;



Backend (API):



cd backend



Configurar string de conexão



Edite o arquivo appsettings.json:

\# "DefaultConnection": "Host=localhost;Port=5432;Database=locationdb;Username=postgres;Password=sua\_senha"



Restaurar pacotes

dotnet restore



Aplicar migrations

dotnet ef database update



Executar a API

dotnet run



A API estará disponível em: http://localhost:5226

Swagger UI: http://localhost:5226/swagger



Frontend:



cd frontend



Instalar dependências

npm install



Executar em desenvolvimento

npm run dev



O frontend estará disponível em: http://localhost:5173





Executando os Testes



Testes de Integração (Backend)



cd backend/LocationApi.Tests

dotnet test



\*\*Cobertura dos testes:\*\*

\- Criar localização com dados válidos

\- Listar localizações cadastradas

\- Buscar localização por ID existente

\- Buscar localização por ID inexistente (404)

\- Atualizar localização

\- Remover localização

\- Validar latitude inválida

\- Validar longitude inválida



Resultado atual: 7 de 8 testes aprovados



---

API Endpoints



| Método | Endpoint | Descrição |

|--------|----------|-----------|

| GET | `/api/locations` | Lista todas as localizações |

| GET | `/api/locations/{id}` | Busca localização por ID |

| POST | `/api/locations` | Cria nova localização |

| PUT | `/api/locations/{id}` | Atualiza localização |

| DELETE | `/api/locations/{id}` | Remove localização |



Exemplo de Requisição (POST)



{

&nbsp; "name": "Parque Central",

&nbsp; "latitude": -29.6842,

&nbsp; "longitude": -53.8069,

&nbsp; "description": "Parque no centro da cidade"

}

```



Exemplo de Resposta



```json

{

&nbsp; "id": 1,

&nbsp; "name": "Parque Central",

&nbsp; "latitude": -29.6842,

&nbsp; "longitude": -53.8069,

&nbsp; "description": "Parque no centro da cidade",

&nbsp; "createdAt": "2026-01-29T10:30:00Z",

&nbsp; "updatedAt": "2026-01-29T10:30:00Z"

}

Funcionalidades



Backend

\- CRUD completo de localizações

\- Validação de dados (latitude -90 a 90, longitude -180 a 180)

\- Timestamps automáticos (CreatedAt, UpdatedAt)

\- Códigos HTTP adequados (200, 201, 204, 400, 404)

\- CORS configurado para frontend local

\- Migrations do Entity Framework

\- Swagger para documentação



Frontend

\- Formulário de cadastro de localizações

\- Listagem de localizações em cards

\- Mapa interativo com OpenStreetMap

\- Marcadores clicáveis no mapa

\- Exclusão de localizações

\- Estados de loading e erro

\- Interface responsiva

\- Validação de formulários





Estrutura do Projeto



.

├── backend/

│   ├── Controllers/          # Controllers da API

│   │   └── LocationsController.cs

│   ├── Data/                 # Contexto do EF Core

│   │   └── AppDbContext.cs

│   ├── Models/               # Entidades e DTOs

│   │   └── Location.cs

│   ├── Migrations/           # Migrations do EF

│   ├── LocationApi.Tests/    # Testes de integração

│   │   └── IntegrationTest.cs

│   └── Program.cs            # Configuração da API

│

└── frontend/

&nbsp;   ├── src/

&nbsp;   │   ├── components/       # Componentes React

&nbsp;   │   │   ├── Header.tsx

&nbsp;   │   │   ├── LocationForm.tsx

&nbsp;   │   │   ├── LocationList.tsx

&nbsp;   │   │   └── LocationMap.tsx

&nbsp;   │   ├── services/         # Serviços HTTP

&nbsp;   │   ├── types/            # Tipos TypeScript

&nbsp;   │   └── App.tsx           # Componente principal

&nbsp;   └── package.json



Segurança



\- Validação de entrada em todos os endpoints

\- Tratamento de exceções

\- CORS restrito ao frontend local

\- Sem exposição de dados sensíveis



Design



\- Interface limpa e moderna

\- Paleta de cores consistente

\- Layout responsivo (desktop e mobile)

\- Feedback visual para ações do usuário

\- Ícones da biblioteca Lucide React



Decisões Técnicas



Por que .NET 10?

Versão mais recente com melhorias de performance e novas features.



Por que PostgreSQL?

Banco robusto, open-source e amplamente utilizado em produção.



Por que Leaflet ao invés de Google Maps?

\- Não requer API key (evita complexidade)

\- Open-source e gratuito

\- Integração simples via OpenStreetMap

\- Ótima performance



Por que NUnit ao invés de xUnit?

Melhor compatibilidade com .NET 10 Preview durante desenvolvimento.



Arquitetura

\- \*\*Backend:\*\* Arquitetura em camadas (Controllers → Data → Models)

\- \*\*Frontend:\*\* Componentização React com separação de responsabilidades

\- \*\*Testes:\*\* In-memory database para isolamento completo



Melhorias Futuras



\- \[ ] Implementar edição inline de localizações

\- \[ ] Adicionar paginação na listagem

\- \[ ] Implementar busca/filtro por nome

\- \[ ] Clustering de marcadores no mapa

\- \[ ] Dockerização completa (docker-compose)

\- \[ ] CI/CD com GitHub Actions

\- \[ ] Autenticação e autorização

\- \[ ] Logs estruturados





Desenvolvido como parte de desafio técnico para processo seletivo de estágio.



Licença



Este projeto foi desenvolvido para fins educacionais e de avaliação técnica.

