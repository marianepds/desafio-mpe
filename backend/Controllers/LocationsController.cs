using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LocationApi.Data;
using LocationApi.Models;

namespace LocationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LocationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/locations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocations()
        {
            var locations = await _context.Locations
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();
            return Ok(locations);
        }

        // GET: api/locations/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Location>> GetLocation(int id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null) return NotFound();
            return Ok(location);
        }

        // POST: api/locations
        [HttpPost]
        public async Task<ActionResult<Location>> PostLocation(Location location)
        {
    
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLocation), new { id = location.Id }, location);
        }
        
        // PUT: api/locations/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutLocation(int id, Location location)
        {
            if (id != location.Id) return BadRequest();

            var existingLocation = await _context.Locations.FindAsync(id);
            if (existingLocation == null) return NotFound();

            existingLocation.Name = location.Name;
            existingLocation.Latitude = location.Latitude;
            existingLocation.Longitude = location.Longitude;
            existingLocation.Description = location.Description;
            existingLocation.UpdatedAt = DateTime.UtcNow; 

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationExists(id)) return NotFound();
                else throw;
            }   
            return NoContent();
        }

        // DELETE: api/locations/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null) return NotFound();

            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LocationExists(int id)
        {
            return _context.Locations.Any(e => e.Id == id);
        }
    }
}