package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.LoginDto;
import cl.ucm.bookapi.ApiBook.dto.in.RegisterDto;
import cl.ucm.bookapi.ApiBook.entities.UserEntity;

public interface AuthService {
    void register(RegisterDto dto);
    UserEntity login(LoginDto dto);
    String getRolNameByEmail(String email);
}
