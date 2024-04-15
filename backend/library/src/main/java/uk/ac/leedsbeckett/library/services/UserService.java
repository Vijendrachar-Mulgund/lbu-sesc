package uk.ac.leedsbeckett.library.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import uk.ac.leedsbeckett.library.domain.dto.bookDTOs.GetAllBorrowedBooks;
import uk.ac.leedsbeckett.library.domain.dto.userDTOs.*;
import uk.ac.leedsbeckett.library.domain.entities.BookEntity;
import uk.ac.leedsbeckett.library.domain.entities.BorrowedBooksEntity;
import uk.ac.leedsbeckett.library.domain.entities.UserEntity;
import uk.ac.leedsbeckett.library.domain.enums.Currency;
import uk.ac.leedsbeckett.library.domain.enums.Role;
import uk.ac.leedsbeckett.library.repositories.BooksRepository;
import uk.ac.leedsbeckett.library.repositories.BorrowedBooksRepository;
import uk.ac.leedsbeckett.library.repositories.UserRepository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
        private final UserRepository usersRepository;

        private final PasswordEncoder passwordEncoder;

        private final JWTService jwtService;

        private final AuthenticationManager authenticationManager;

        private final BooksRepository booksRepository;

        private final BorrowedBooksRepository borrowedBooksRepository;

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

        public String borrowBook(HttpHeaders header, Integer isbn) {

                // Get the user details from the JWT token
                List<String> jwt = header.get("Authorization");

                assert jwt != null;
                String studentEmail = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

                UserEntity user = usersRepository.findByEmail(studentEmail).orElseThrow();

                BookEntity book = booksRepository.findByIsbn(isbn).orElseThrow();

                Calendar calendar = Calendar.getInstance();
                calendar.add(Calendar.DATE, 1);

                if (book.getCopies() >= 1) {
                        BorrowedBooksEntity borrowedBook = BorrowedBooksEntity.builder()
                                        .book(book)
                                        .title(book.getTitle())
                                        .borrowedDate(new Date())
                                        .dueDate(calendar.getTime())
                                        .isbn(book.getIsbn())
                                        .student(user)
                                        .build();

                        borrowedBooksRepository.save(borrowedBook);

                        book.setCopies(book.getCopies() - 1);
                        booksRepository.save(book);
                } else {
                        throw new RuntimeException("No more copies available");
                }

                return "Book borrowed successfully";
        }

        public String returnBook(HttpHeaders header, String borrowId) {
                List<String> jwt = header.get("Authorization");

                assert jwt != null;
                String studentEmail = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

                double finePerDay = 3.0;

                UserEntity user = usersRepository.findByEmail(studentEmail).orElseThrow();

                BorrowedBooksEntity borrowedBook = borrowedBooksRepository.findById(borrowId).orElseThrow();

                BookEntity book = booksRepository.findByIsbn(borrowedBook.getIsbn()).orElseThrow();

                LocalDate due = borrowedBook.getDueDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                LocalDate today = LocalDate.now();

                long pastDueDate = ChronoUnit.DAYS.between(due, today);

                if (pastDueDate > 0) {
                        Double fineAmount = finePerDay * pastDueDate;
                        // Create an Invoice for the same
                        RestTemplate restTemplate = new RestTemplate();
                        String createNewFinanceInvoiceURI = financeBaseURI + "/api/invoice/create/" + studentEmail;

                        CreateInvoiceDTO newInvoice = CreateInvoiceDTO.builder()
                                        .amount(fineAmount)
                                        .currency(Currency.GBP)
                                        .title(book.getTitle())
                                        .type("BOOK")
                                        .studentId(user.getStudentId())
                                        .build();

                        restTemplate.postForObject(createNewFinanceInvoiceURI, newInvoice, String.class);
                }

                borrowedBook.setReturnedDate(new Date());
                borrowedBooksRepository.save(borrowedBook);
                book.setCopies(book.getCopies() + 1);
                booksRepository.save(book);

                return "The book returned successfully";
        }

        public GetAllBorrowedBooks getBorrowedBooks(HttpHeaders header) {
                // Get the user details from the JWT token
                List<String> jwt = header.get("Authorization");

                assert jwt != null;
                String studentEmail = jwtService.extractUsername(jwt.get(0).split(" ")[1]);

                UserEntity user = usersRepository.findByEmail(studentEmail).orElseThrow();

                Set<BorrowedBooksEntity> borrowedBooks = borrowedBooksRepository.findAllByStudentId(user.getId());

                return GetAllBorrowedBooks.builder()
                                .status("success")
                                .message("All borrowed books fetched successfully")
                                .books(borrowedBooks)
                                .build();
        }
}
