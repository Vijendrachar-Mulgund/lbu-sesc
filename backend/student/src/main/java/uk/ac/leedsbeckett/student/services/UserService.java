package uk.ac.leedsbeckett.student.services;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.*;
import uk.ac.leedsbeckett.student.domain.entities.CourseEntity;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;
import uk.ac.leedsbeckett.student.domain.enums.Role;
import uk.ac.leedsbeckett.student.repositories.CourseRepository;
import uk.ac.leedsbeckett.student.repositories.UsersRepository;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

        private final UsersRepository usersRepository;

        private final CourseRepository courseRepository;

        private final PasswordEncoder passwordEncoder;

        private final JWTService jwtService;

        private final AuthenticationManager authenticationManager;

        @Value("${uri.base.finance}")
        private String financeBaseURI;

        @Value("${uri.base.library}")
        private String libraryBaseURI;

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

                CreateNewUserDTO newFinanceUserDTO = CreateNewUserDTO.builder()
                                .email(request.getEmail())
                                .firstname(request.getFirstname())
                                .lastname(request.getLastname())
                                .password(request.getPassword())
                                .studentId(newUser.getStudentId())
                                .build();

                CreateNewUserDTO newLibraryUserDTO = CreateNewUserDTO.builder()
                                .email(request.getEmail())
                                .firstname(request.getFirstname())
                                .lastname(request.getLastname())
                                .password(request.getPassword())
                                .studentId(newUser.getStudentId())
                                .build();

                // Create a new User on the finance portal
                RestTemplate restTemplate = new RestTemplate();
                String createNewFinanceAccountURI = financeBaseURI + "/api/auth/signup";
                String createNewLibraryAccountURI = libraryBaseURI + "/api/auth/signup";

                restTemplate.postForObject(createNewFinanceAccountURI, newFinanceUserDTO, String.class);
                restTemplate.postForObject(createNewLibraryAccountURI, newLibraryUserDTO, String.class);

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

        public String updateUser(HttpHeaders header, UpdateUserRequestDTO request) {
                // Get the user details from the JWT token
                List<String> jwt = header.get("Authorization");

                assert jwt != null;

                String studentEmail = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

                UserEntity user = usersRepository.findByEmail(studentEmail).orElseThrow();

                if (request.getFirstname() != null) {
                        user.setFirstname(request.getFirstname());
                        usersRepository.save(user);
                }
                if (request.getLastname() != null) {
                        user.setLastname(request.getLastname());
                        usersRepository.save(user);
                }

                return "User updated successfully";
        }

        public String enrollStudentIntoCourse(HttpHeaders header, String courseId) {
                // Get the user details from the JWT token
                List<String> jwt = header.get("Authorization");

                assert jwt != null;
                String studentEmail = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

                UserEntity user = usersRepository.findByEmail(studentEmail).orElseThrow();

                CourseEntity course = courseRepository.findById(courseId).orElseThrow();

                Set<CourseEntity> enrolledCourses = user.getEnrolledCourses();

                if (enrolledCourses.contains(course)) {
                        return "Student Already Enrolled";
                }

                user.getEnrolledCourses().add(course);
                usersRepository.save(user);

                user.setEnrolledCourses(Set.of(course));

                RestTemplate restTemplate = new RestTemplate();
                String createNewFinanceInvoiceURI = financeBaseURI + "/api/invoice/create/" + studentEmail;

                CreateInvoiceDTO newInvoice = CreateInvoiceDTO.builder()
                                .amount(course.getFees())
                                .currency(course.getCurrency())
                                .title(course.getCourseName())
                                .type("TUITION")
                                .studentId(user.getStudentId())
                                .build();

                restTemplate.postForObject(createNewFinanceInvoiceURI, newInvoice, String.class);

                // Enroll the student into a course
                return "Student enrolled into course successfully";
        }

        public GetAllEnrolledCoursesDTO getEnrolledCourses(HttpHeaders header) {
                // Get the user details from the JWT token
                List<String> jwt = header.get("Authorization");

                assert jwt != null;
                String studentEmail = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

                UserEntity user = usersRepository.findByEmail(studentEmail).orElseThrow();

                Set<CourseEntity> enrolledCourses = user.getEnrolledCourses();

                return GetAllEnrolledCoursesDTO.builder()
                                .status("success")
                                .message("Enrolled courses fetched successfully")
                                .enrolledCourses(enrolledCourses)
                                .build();
        }

        public GetBalanceDTO checkBalance(HttpHeaders header) {
                // Get the user details from the JWT token
                List<String> jwt = header.get("Authorization");

                assert jwt != null;
                String studentEmail = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

                RestTemplate restTemplate = new RestTemplate();
                String checkBalanceURI = financeBaseURI + "/api/invoice/balance/" + studentEmail;

                return restTemplate.getForObject(checkBalanceURI, GetBalanceDTO.class);

        }
}
