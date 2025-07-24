// Data/ApplicationDbContext.cs
using backend_api.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
