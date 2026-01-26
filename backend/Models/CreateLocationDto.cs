using System.ComponentModel.DataAnnotations;

namespace LocationApi.Models
{
    // DTO para CRIAÇÃO de localização
    public class CreateLocationDto
    {
        [Required(ErrorMessage = "O nome é obrigatório")]
        [StringLength(100, MinimumLength = 3, 
            ErrorMessage = "O nome deve ter entre 3 e 100 caracteres")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "A latitude é obrigatória")]
        [Range(-90, 90, ErrorMessage = "A latitude deve estar entre -90 e 90")]
        public double Latitude { get; set; }

        [Required(ErrorMessage = "A longitude é obrigatória")]
        [Range(-180, 180, ErrorMessage = "A longitude deve estar entre -180 e 180")]
        public double Longitude { get; set; }

        [StringLength(500, 
            ErrorMessage = "A descrição deve ter no máximo 500 caracteres")]
        public string? Description { get; set; }
    }
}