package cl.ucm.bookapi.ApiBook.controller;

import cl.ucm.bookapi.ApiBook.dto.in.LoginDto;
import cl.ucm.bookapi.ApiBook.dto.in.RegisterDto;
import cl.ucm.bookapi.ApiBook.entities.UserEntity;
import cl.ucm.bookapi.ApiBook.security.JwtUtil;
import cl.ucm.bookapi.ApiBook.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody RegisterDto dto) {
        authService.register(dto);
        return "Usuario registrado correctamente";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto dto) {
        UserEntity user = authService.login(dto);
        String rol = authService.getRolNameByEmail(user.getEmail());
        return jwtUtil.generateToken(user.getEmail(), rol);
    }
}
