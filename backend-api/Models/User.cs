// Models/User.cs
namespace backend_api.Models
{
    public class User
    {
        public int Id { get; set; }  // Primary Key
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
