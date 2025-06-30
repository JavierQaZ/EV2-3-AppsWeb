package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.LoginDto;
import cl.ucm.bookapi.ApiBook.dto.in.RegisterDto;
import cl.ucm.bookapi.ApiBook.entities.RolEntity;
import cl.ucm.bookapi.ApiBook.entities.UserEntity;
import cl.ucm.bookapi.ApiBook.entities.UserRolEntity;
import cl.ucm.bookapi.ApiBook.repository.RolRepository;
import cl.ucm.bookapi.ApiBook.repository.UserRepository;
import cl.ucm.bookapi.ApiBook.repository.UserRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private UserRolRepository userRolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void register(RegisterDto dto) {
        if (userRepository.existsById(dto.getEmail())) {
            throw new RuntimeException("Ya existe un usuario con ese correo.");
        }

        UserEntity user = new UserEntity();
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setLastName(dto.getLastName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setState(true);

        userRepository.save(user);

        // Asignar rol "Lector"
        RolEntity lectorRol = rolRepository.findByName("Lector")
                .orElseThrow(() -> new RuntimeException("Rol Lector no encontrado"));

        UserRolEntity userRol = new UserRolEntity();
        userRol.setUserFk(user.getEmail());
        userRol.setRolFk(lectorRol.getId());

        userRolRepository.save(userRol);
    }

    @Override
    public UserEntity login(LoginDto dto) {
        UserEntity user = userRepository.findById(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return user;
    }
}
