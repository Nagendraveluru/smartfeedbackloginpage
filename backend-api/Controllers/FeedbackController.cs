using backend_api.Data;
using backend_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeedbackController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Feedback/submit
        [HttpPost("submit")]
        public async Task<IActionResult> Submit([FromBody] Feedback feedback)
        {
            if (string.IsNullOrWhiteSpace(feedback.Username) || string.IsNullOrWhiteSpace(feedback.Message))
            {
                return BadRequest(new { message = "Username and Message are required." });
            }

            feedback.SubmittedAt = DateTime.UtcNow;

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Feedback submitted successfully." });
        }

        // GET: api/Feedback/user/{username}
        [HttpGet("user/{username}")]
        public async Task<IActionResult> GetUserFeedbacks(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return BadRequest(new { message = "Username is required." });
            }

            var data = await _context.Feedbacks
                .Where(f => f.Username == username)
                .OrderByDescending(f => f.SubmittedAt)
                .ToListAsync();

            return Ok(data);
        }

        // GET: api/Feedback/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _context.Feedbacks
                .OrderByDescending(f => f.SubmittedAt)
                .ToListAsync();

            return Ok(data);
        }

        // Optional: GET: api/Feedback/summary
        // Used for admin chart (anonymized summary)
        [HttpGet("summary")]
        public async Task<IActionResult> GetFeedbackSummary()
        {
            var grouped = await _context.Feedbacks
                .GroupBy(f => f.Username)
                .Select(g => new { Username = g.Key, Count = g.Count() })
                .ToListAsync();

            return Ok(grouped);
        }
    }
}
