package uk.ac.leedsbeckett.student.services;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsersRepository usersRepository;

    private final PasswordEncoder passwordEncoder;

    private final JWTService jwtService;

    private final AuthenticationManager authenticationManager;

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

    public AuthenticationResponseDTO logUserIn(LoginUserRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var existingUser = usersRepository.findByEmail(request.getEmail()).orElseThrow();

        // Generate new JWT token
        var jwtToken = jwtService.generateJWTToken(existingUser);

        UserDetailsDTO user = UserDetailsDTO.builder()
                .email(existingUser.getEmail())
                .firstname(existingUser.getFirstname())
                .lastname(existingUser.getLastname())
                .username(existingUser.getUsername())
                .build();

        // Send the response
        return AuthenticationResponseDTO.builder()
                .status("success")
                .message("User Logged in successfully")
                .token(jwtToken)
                .user(user)
                .build();
    }
}
