using Microsoft.EntityFrameworkCore;
using LocationApi.Models;

namespace LocationApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options)
        {
        }

        public DbSet<Location> Locations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Location>(entity =>
            {
                entity.ToTable("locations");
                
                // MAPEAMENTO EXPLÍCITO minúsculo
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();
                    
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name");
                    
                entity.Property(e => e.Latitude)
                    .HasColumnType("decimal(10,6)")
                    .HasColumnName("latitude");
                    
                entity.Property(e => e.Longitude)
                    .HasColumnType("decimal(10,6)")
                    .HasColumnName("longitude");
                    
                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .HasColumnName("description");
                    
                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .ValueGeneratedOnAddOrUpdate();

                entity.HasIndex(e => e.Name);
            });
        }
    }
}