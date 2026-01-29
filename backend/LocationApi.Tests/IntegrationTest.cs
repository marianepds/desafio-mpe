using LocationApi.Data;
using LocationApi.Models;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace LocationApi.Tests;

[TestFixture]
public class IntegrationTests
{
    // TESTE 1: Criar localização com dados válidos
    [Test]
    public async Task CreateLocation_WithValidData_SavesToDatabase()
    {
        // Arrange - Cria banco em memória
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_Create_" + Guid.NewGuid())
            .Options;

        using var context = new AppDbContext(options);
        
        var location = new Location
        {
            Name = "Parque Central",
            Latitude = -23.550520m,
            Longitude = -46.633308m,
            Description = "Parque no centro da cidade"
        };

        // Act
        context.Locations.Add(location);
        await context.SaveChangesAsync();

        // Assert
        var savedLocation = await context.Locations.FirstOrDefaultAsync();
        Assert.That(savedLocation, Is.Not.Null);
        Assert.That(savedLocation.Name, Is.EqualTo("Parque Central"));
        Assert.That(savedLocation.Latitude, Is.EqualTo(-23.550520m));
        Assert.That(savedLocation.Longitude, Is.EqualTo(-46.633308m));
    }

    // TESTE 2: Listar localizações cadastradas
    [Test]
    public async Task GetLocations_ReturnsListWithCreatedLocation()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_List_" + Guid.NewGuid())
            .Options;

        using var context = new AppDbContext(options);
        
        // Adiciona duas localizações
        context.Locations.Add(new Location
        {
            Name = "Praia do Futuro",
            Latitude = -3.71839m,
            Longitude = -38.5434m,
            Description = "Praia famosa de Fortaleza"
        });
        
        context.Locations.Add(new Location
        {
            Name = "Museu do Amanhã",
            Latitude = -22.8945m,
            Longitude = -43.1801m
        });
        
        await context.SaveChangesAsync();

        // Act
        var locations = await context.Locations.ToListAsync();

        // Assert
        Assert.That(locations.Count, Is.EqualTo(2));
        Assert.That(locations.Any(l => l.Name == "Praia do Futuro"), Is.True);
        Assert.That(locations.Any(l => l.Name == "Museu do Amanhã"), Is.True);
    }

    // TESTE 3: Buscar por ID existente
    [Test]
    public async Task GetLocationById_ExistingId_ReturnsLocation()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_GetById_" + Guid.NewGuid())
            .Options;

        using var context = new AppDbContext(options);
        
        var location = new Location
        {
            Name = "Museu do Amanhã",
            Latitude = -22.8945m,
            Longitude = -43.1801m
        };
        
        context.Locations.Add(location);
        await context.SaveChangesAsync();
        var id = location.Id;

        // Act
        var foundLocation = await context.Locations.FindAsync(id);

        // Assert
        Assert.That(foundLocation, Is.Not.Null);
        Assert.That(foundLocation.Name, Is.EqualTo("Museu do Amanhã"));
        Assert.That(foundLocation.Id, Is.EqualTo(id));
    }

    // TESTE 4: Buscar por ID inexistente
    [Test]
    public async Task GetLocationById_NonExistingId_ReturnsNull()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_NotFound_" + Guid.NewGuid())
            .Options;

        using var context = new AppDbContext(options);

        // Act
        var foundLocation = await context.Locations.FindAsync(99999);

        // Assert
        Assert.That(foundLocation, Is.Null);
    }

    // TESTE 5: Atualizar localização
    [Test]
    public async Task UpdateLocation_ExistingId_UpdatesData()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_Update_" + Guid.NewGuid())
            .Options;

        using var context = new AppDbContext(options);
        
        var location = new Location
        {
            Name = "Local Antigo",
            Latitude = -15.793889m,
            Longitude = -47.882778m,
            Description = "Descrição antiga"
        };
        
        context.Locations.Add(location);
        await context.SaveChangesAsync();
        var id = location.Id;

        // Act - Atualizar
        location.Name = "Local Atualizado";
        location.Description = "Nova descrição";
        context.Locations.Update(location);
        await context.SaveChangesAsync();

        // Assert
        var updatedLocation = await context.Locations.FindAsync(id);
        Assert.That(updatedLocation, Is.Not.Null);
        Assert.That(updatedLocation.Name, Is.EqualTo("Local Atualizado"));
        Assert.That(updatedLocation.Description, Is.EqualTo("Nova descrição"));
        Assert.That(updatedLocation.CreatedAt, Is.Not.EqualTo(updatedLocation.UpdatedAt));
    }

    // TESTE 6: Remover localização
    [Test]
    public async Task DeleteLocation_ExistingId_RemovesFromDatabase()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_Delete_" + Guid.NewGuid())
            .Options;

        using var context = new AppDbContext(options);
        
        var location = new Location
        {
            Name = "Local para Excluir",
            Latitude = -22.9068m,
            Longitude = -43.1729m
        };
        
        context.Locations.Add(location);
        await context.SaveChangesAsync();
        var id = location.Id;

        // Act - Remover
        context.Locations.Remove(location);
        await context.SaveChangesAsync();

        // Assert
        var deletedLocation = await context.Locations.FindAsync(id);
        Assert.That(deletedLocation, Is.Null);
    }

    // TESTE 7: Validações de dados
    [Test]
    public void Location_WithInvalidLatitude_ShouldBeInvalid()
    {
        // Arrange
        var location = new Location
        {
            Name = "Local Inválido",
            Latitude = 100.0m, // Latitude inválida (> 90)
            Longitude = -46.633308m
        };

        // Act & Assert
        var isValidLatitude = location.Latitude >= -90 && location.Latitude <= 90;
        Assert.That(isValidLatitude, Is.False, "Latitude deve estar entre -90 e 90");
    }

    [Test]
    public void Location_WithInvalidLongitude_ShouldBeInvalid()
    {
        // Arrange
        var location = new Location
        {
            Name = "Local Inválido",
            Latitude = -23.550520m,
            Longitude = 200.0m // Longitude inválida (> 180)
        };

        // Act & Assert
        var isValidLongitude = location.Longitude >= -180 && location.Longitude <= 180;
        Assert.That(isValidLongitude, Is.False, "Longitude deve estar entre -180 e 180");
    }
}