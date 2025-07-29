using System;
using System.ComponentModel.DataAnnotations;

namespace backend_api.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Message { get; set; }

        public DateTime SubmittedAt { get; set; }
    }
}
