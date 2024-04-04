package uk.ac.leedsbeckett.student.services;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.*;
import uk.ac.leedsbeckett.student.domain.entities.CourseEntity;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;
import uk.ac.leedsbeckett.student.domain.enums.Role;
import uk.ac.leedsbeckett.student.repositories.CourseRepository;
import uk.ac.leedsbeckett.student.repositories.UsersRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

        private final UsersRepository usersRepository;

        private final CourseRepository courseRepository;

        private final PasswordEncoder passwordEncoder;

        private final JWTService jwtService;

        private final AuthenticationManager authenticationManager;

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
                                .isEligibleForGraduation(false)
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
                                .studentId(newUser.getStudentId())
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
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

                var existingUser = usersRepository.findByEmail(request.getEmail()).orElseThrow();

                // Generate new JWT token
                String jwtToken = jwtService.generateJWTToken(existingUser);

                UserDetailsDTO user = UserDetailsDTO.builder()
                                .email(existingUser.getEmail())
                                .firstname(existingUser.getFirstname())
                                .lastname(existingUser.getLastname())
                                .studentId(existingUser.getStudentId())
                                .build();

                // Send the response
                return AuthenticationResponseDTO.builder()
                                .status("success")
                                .message("User Logged in successfully")
                                .token(jwtToken)
                                .user(user)
                                .build();
        }

        public UserProfileResponseDTO getUserProfileDetails(HttpHeaders header) {
                // Get the user details from the JWT token
                List<String> jwt = header.get("Authorization");

                assert jwt != null;
                String username = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

                var user = usersRepository.findByEmail(username).orElseThrow();

                UserProfileDetailsDTO userDetails = UserProfileDetailsDTO.builder()
                                .id(user.getId())
                                .email(user.getEmail())
                                .firstname(user.getFirstname())
                                .lastname(user.getLastname())
                                .studentId(user.getStudentId())
                                .isEligibleForGraduation(user.getIsEligibleForGraduation())
                                .outstandingBillAmount(user.getOutstandingBillAmount())
                                .createdAt(user.getCreatedAt())
                                .build();

                return UserProfileResponseDTO.builder()
                                .status("success")
                                .message("User profile details fetched successfully")
                                .user(userDetails)
                                .build();
        }

        public String enrollStudentIntoCourse(HttpHeaders header, String courseId) {
                // Get the user details from the JWT token
                List<String> jwt = header.get("Authorization");

                assert jwt != null;
                String username = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

                Optional<UserEntity> user = usersRepository.findByEmail(username);

                CourseEntity course = courseRepository.findById(courseId).orElseThrow();

                user.map(u -> {
                        u.getEnrolledCourses().add(course);
                        return usersRepository.save(u);
                });

                // Enroll the student into a course
                return "Student enrolled into course successfully";
        }

        public GetAllEnrolledCoursesDTO getEnrolledCourses(HttpHeaders header) {
                // Get the user details from the JWT token
                List<String> jwt = header.get("Authorization");

                assert jwt != null;
                String username = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

                UserEntity user = usersRepository.findByEmail(username).orElseThrow();

                Set<CourseEntity> enrolledCourses = user.getEnrolledCourses();

                return GetAllEnrolledCoursesDTO.builder()
                                .status("success")
                                .message("Enrolled courses fetched successfully")
                                .enrolledCourses(enrolledCourses)
                                .build();
        }
}
