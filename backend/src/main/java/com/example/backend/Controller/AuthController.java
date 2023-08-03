package com.example.backend.Controller;
import com.example.backend.DTO.CurrentUser;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import com.example.backend.Payload.req.ReqLogin;
import com.example.backend.Security.JwtService;
import com.example.backend.Services.AuthService.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService service;
    private final JwtService jwtService;

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody UserDTO dto) {
        return service.login(dto);
    }

    @PostMapping("/register")
    public HttpEntity<?> register(@RequestBody ReqLogin dto) {
        return service.register(dto);
    }

    @PostMapping("/refresh")
    public HttpEntity<?> refreshUser(@RequestParam String refreshToken) {
        return service.refreshToken(refreshToken);
    }

    @GetMapping("/decode")
    public HttpEntity<?> decode(@CurrentUser User user) {
        return ResponseEntity.ok(user);
    }

}
