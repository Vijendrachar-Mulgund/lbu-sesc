package uk.ac.leedsbeckett.student.services;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uk.ac.leedsbeckett.student.domain.dto.AuthenticationResponseDTO;
import uk.ac.leedsbeckett.student.domain.dto.LoginUserRequestDTO;
import uk.ac.leedsbeckett.student.domain.dto.RegisterNewUserRequestDTO;
import uk.ac.leedsbeckett.student.domain.dto.UserDetailsDTO;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;
import uk.ac.leedsbeckett.student.domain.enums.Role;
import uk.ac.leedsbeckett.student.repositories.UsersRepository;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsersRepository usersRepository;

    private final PasswordEncoder passwordEncoder;

    private final JWTService jwtService;

    private String generateUsername() {
        return "c" + Math.round(Math.random() * 1000000);
    }

    public AuthenticationResponseDTO createUser(RegisterNewUserRequestDTO request) {
        // Generate the new user object
        UserEntity newUser = UserEntity.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .username(generateUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .createdAt(new Date())
                .updatedAt(new Date())
                .role(Role.STUDENT)
                .build();

        usersRepository.save(newUser);

        // Generate new JWT token
        var jwtToken = jwtService.generateJWTToken(newUser);

        UserDetailsDTO user = UserDetailsDTO.builder()
                .email(newUser.getEmail())
                .firstname(newUser.getFirstname())
                .lastname(newUser.getLastname())
                .username(newUser.getUsername())
                .build();

        // Send the response
        return AuthenticationResponseDTO.builder()
                .status("success")
                .message("User created successfully")
                .token(jwtToken)
                .user(user)
                .build();
    }
}
