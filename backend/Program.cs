using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;          
using LocationApi.Data;                      

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();           
builder.Services.AddEndpointsApiExplorer();  
builder.Services.AddOpenApi();            

//cors
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

app.Run(); 