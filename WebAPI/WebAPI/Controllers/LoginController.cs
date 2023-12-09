using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly LoginService _loginService;

        public LoginController(LoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var result = _loginService.CheckLogin(request.Email, request.Password);

            if (result)
            {
                return Ok(new { Message = "Login successful" });
            }

            return BadRequest(new { Message = "Invalid credentials" });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            var result = _loginService.RegisterUser(request.FirstName, request.LastName, request.Email, request.Password);

            if (result)
            {
                return Ok(new { Message = "User registered successfully" });
            }

            return BadRequest(new { Message = "Failed to register user" });
        }

        [HttpPost("changepassword")]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var result = _loginService.ChangePassword(request.Email, request.NewPassword);

            if (result)
            {
                return Ok(new { Message = "Password changed successfully" });
            }

            return BadRequest(new { Message = "Failed to change password" });
        }
    }
}