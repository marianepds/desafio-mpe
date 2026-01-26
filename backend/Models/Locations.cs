using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 

namespace LocationApi.Models
{
    public class Location
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] //autoincremento no db
        public int Id { get; set; } // identifica unicamente cada loc

        [Required]
        [StringLength(100, MinimumLength = 3)] // nome obrigatorio
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(-90, 90)] // polo sul a norte
        public double Latitude { get; set; }

        [Required]
        [Range(-180, 180)] // meridiano de greenwich
        public double Longitude { get; set; } // numero com casas decimais

        [StringLength(500)]
        public string? Description { get; set; } // descriçao opcional

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // datas de criacao e atualizacao
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}