package uk.ac.leedsbeckett.library.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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

        public AuthenticationResponseDTO createUser(RegisterNewUserRequestDTO request) {
                // Generate the new user object
                String defaultPin = "000000";
                UserEntity newUser = UserEntity.builder()
                                .firstname(request.getFirstname())
                                .lastname(request.getLastname())
                                .email(request.getEmail())
                                .studentId(request.getStudentId())
                                .isDefaultPin(true)
                                .password(passwordEncoder.encode(defaultPin))
                                .createdAt(new Date())
                                .updatedAt(new Date())
                                .role(Role.STUDENT)
                                .build();

                usersRepository.save(newUser);

                UserProfileDetailsDTO user = UserProfileDetailsDTO.builder()
                                .id(newUser.getId())
                                .studentId(newUser.getStudentId())
                                .email(newUser.getEmail())
                                .firstname(newUser.getFirstname())
                                .lastname(newUser.getLastname())
                                .isDefaultPin(newUser.getIsDefaultPin())
                                .createdAt(newUser.getCreatedAt())
                                .updatedAt(newUser.getUpdatedAt())
                                .build();

                // Send the response
                return AuthenticationResponseDTO.builder()
                                .status("success")
                                .message("User created successfully")
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
                                .isDefaultPin(existingUser.getIsDefaultPin())
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

        public AuthenticationResponseDTO changePin(RequestChangePinDTO request, String email) {
                UserEntity existingUser = usersRepository.findByEmail(email).orElseThrow();

                String jwtToken = jwtService.generateJWTToken(existingUser);

                existingUser.setPassword(passwordEncoder.encode(request.getPin()));
                existingUser.setIsDefaultPin(false);

                usersRepository.save(existingUser);

                UserProfileDetailsDTO user = UserProfileDetailsDTO.builder()
                                .id(existingUser.getId())
                                .studentId(existingUser.getStudentId())
                                .email(existingUser.getEmail())
                                .firstname(existingUser.getFirstname())
                                .lastname(existingUser.getLastname())
                                .isDefaultPin(existingUser.getIsDefaultPin())
                                .updatedAt(existingUser.getUpdatedAt())
                                .createdAt(existingUser.getCreatedAt())
                                .build();

                // Send the response
                return AuthenticationResponseDTO.builder()
                                .status("success")
                                .message("Pin Changed successfully")
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
                                .isDefaultPin(user.getIsDefaultPin())
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
