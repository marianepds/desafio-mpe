using Microsoft.EntityFrameworkCore;
using LocationApi.Models;

namespace LocationApi.Data
{
    // Herda de DbContext (classe do Entity Framework)
    public class AppDbContext : DbContext
    {
        // CONSTRUTOR: Recebe configurações do banco
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options)  // Passa para a classe pai
        {
        }

        // PROPRIEDADE: Representa a tabela "Locations" no banco
        // DbSet<Location> = Conjunto de dados da tabela Location
        public DbSet<Location> Locations { get; set; }

        // MÉTODO: Configurações extras do modelo
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);  // Chama configuração base

            // Configurações específicas da tabela Location
            modelBuilder.Entity<Location>(entity =>
            {
                // Configura a coluna Name
                entity.Property(l => l.Name)
                    .IsRequired()                 // NOT NULL no banco
                    .HasMaxLength(100);          // VARCHAR(100)

                // Configura a coluna Description
                entity.Property(l => l.Description)
                    .HasMaxLength(500);          // VARCHAR(500)

                // Cria ÍNDICE na coluna Name (acelera buscas)
                entity.HasIndex(l => l.Name);
            });
        }
    }
}