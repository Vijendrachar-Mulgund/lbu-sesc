package uk.ac.leedsbeckett.library.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import uk.ac.leedsbeckett.library.domain.dto.userDTOs.*;
import uk.ac.leedsbeckett.library.domain.entities.UserEntity;
import uk.ac.leedsbeckett.library.domain.enums.Role;
import uk.ac.leedsbeckett.library.repositories.UserRepository;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository usersRepository;

    private final PasswordEncoder passwordEncoder;

    private final JWTService jwtService;

    private final AuthenticationManager authenticationManager;

    @Value("${uri.base.finance}")
    private String financeBaseURI;

    private String generateStudentId() {
        return "c" + Math.round(Math.random() * 1000000);
    }

    public AuthenticationResponseDTO createUser(RegisterNewUserRequestDTO request) {
        // Generate the new user object
        UserEntity newUser = UserEntity.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .studentId(generateStudentId())
                .password(passwordEncoder.encode(request.getPassword()))
                .createdAt(new Date())
                .updatedAt(new Date())
                .role(Role.STUDENT)
                .build();

        usersRepository.save(newUser);

        // Generate new JWT token
        var jwtToken = jwtService.generateJWTToken(newUser);

        UserProfileDetailsDTO user = UserProfileDetailsDTO.builder()
                .id(newUser.getId())
                .studentId(newUser.getStudentId())
                .email(newUser.getEmail())
                .firstname(newUser.getFirstname())
                .lastname(newUser.getLastname())
                .createdAt(newUser.getCreatedAt())
                .updatedAt(newUser.getUpdatedAt())
                .build();

        CreateNewUserDTO newUserDTO = CreateNewUserDTO.builder()
                .email(request.getEmail())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .password(request.getPassword())
                .studentId(newUser.getStudentId())
                .build();

        // Create a new User on the finance portal
        RestTemplate restTemplate = new RestTemplate();
        String createNewFinanceAccountURI = financeBaseURI + "/api/auth/signup";

        restTemplate.postForObject(createNewFinanceAccountURI, newUserDTO, String.class);

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
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        var existingUser = usersRepository.findByEmail(request.getEmail()).orElseThrow();

        // Generate new JWT token
        String jwtToken = jwtService.generateJWTToken(existingUser);

        UserProfileDetailsDTO user = UserProfileDetailsDTO.builder()
                .id(existingUser.getId())
                .studentId(existingUser.getStudentId())
                .email(existingUser.getEmail())
                .firstname(existingUser.getFirstname())
                .lastname(existingUser.getLastname())
                .updatedAt(existingUser.getUpdatedAt())
                .createdAt(existingUser.getCreatedAt())
                .build();

        // Send the response
        return AuthenticationResponseDTO.builder()
                .status("success")
                .message("User Logged in successfully")
                .token(jwtToken)
                .user(user)
                .build();
    }

    public AuthenticationResponseDTO authenticate(HttpHeaders header) {
        // Get the user details from the JWT token
        List<String> jwt = header.get("Authorization");

        assert jwt != null;
        String jwtToken = jwt.get(0).split(" ")[1];

        String studentEmail = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

        UserEntity user = usersRepository.findByEmail(studentEmail).orElseThrow();

        UserProfileDetailsDTO userDetails = UserProfileDetailsDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .studentId(user.getStudentId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();

        return AuthenticationResponseDTO.builder()
                .status("success")
                .message("User profile details fetched successfully")
                .token(jwtToken)
                .user(userDetails)
                .build();
    }
}
