using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;          
using LocationApi.Data;                      

var builder = WebApplication.CreateBuilder(args);

System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Encoder = 
            System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });


builder.Services.AddControllers();           
builder.Services.AddEndpointsApiExplorer();  
builder.Services.AddOpenApi(); 
builder.Services.AddSwaggerGen();

// cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",       
        policy =>
        {
            policy.WithOrigins(              
                "http://localhost:5173",     
                "http://localhost:3000")     
                  .AllowAnyHeader()          
                  .AllowAnyMethod();    // get ou post     
        });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/openapi/v1.json", "Location API v1");
        c.RoutePrefix = "swagger"; 
    });
}

app.UseHttpsRedirection();   // redireciona
app.UseCors("AllowFrontend"); // aplica cors
app.UseAuthorization();    // habilita autenticação e autorização
app.MapControllers();      

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();  
}

// debug
app.MapGet("/teste-api", () => "api funciona!");
app.MapGet("/api/teste-locations", () => new[] { 
    new { id = 99, name = "Teste API", lat = -29.68, lng = -53.80 } 
});
Console.WriteLine("debug adicionado");

app.Run();

public partial class Program { }