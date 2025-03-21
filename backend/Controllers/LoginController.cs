using HerumSiteServer.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace HerumSiteServer.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IUserRepository _userRepository;

        public LoginController(
            ILogger<LoginController> logger,
            IUserRepository userRepository
            )
        {
            _logger = logger;
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginModel loginModel)
        {
            var user = _userRepository.GetUsers().FirstOrDefault(u => u.PersonalId == loginModel.PersonalId && u.MilitaryId == loginModel.MilitaryId);

            if (user == null)
            {
                return Unauthorized();
            }

            var sessionId = Guid.NewGuid().ToString();
            user.SessionId = sessionId;
            _userRepository.UpdateUser(user);

            return Ok(new { SessionId = sessionId });
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync([FromBody] UserCreateModel userCreateModel)
        {
            var isCreated = _userRepository.CreateUser(userCreateModel);

            var creationResponse = new UserCreationResponse
            {
                IsCreated = isCreated
            };

            return Ok(creationResponse);
        }
    }

    public class UserLoginModel
    {
        public string PersonalId { get; set; }
        public string MilitaryId { get; set; }
    }

    public class UserCreateModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PersonalId { get; set; }
        public string MilitaryId { get; set; }
        public string ReferringUser { get; set; }
    }

    public class UserCreationResponse
    {
        public bool IsCreated { get; internal set; }
    }

}
