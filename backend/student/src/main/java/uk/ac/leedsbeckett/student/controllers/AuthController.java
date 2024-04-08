package uk.ac.leedsbeckett.student.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.AuthenticationResponseDTO;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.CreateNewUserDTO;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.LoginUserRequestDTO;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.RegisterNewUserRequestDTO;
import uk.ac.leedsbeckett.student.services.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    @Value("${uri.base.finance}")
    private String financeBaseURI;

    @PostMapping(path = "/signup")
    public ResponseEntity<AuthenticationResponseDTO> createNewUser(@RequestBody @Valid RegisterNewUserRequestDTO request) {
        // Create new user in the student database
        AuthenticationResponseDTO newUser = userService.createUser(request);

        CreateNewUserDTO newUserDTO = CreateNewUserDTO.builder()
                .email(request.getEmail())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .password(request.getPassword())
                .studentId(newUser.getUser().getStudentId())
                .build();

        // Create a new User on the finance portal
        RestTemplate restTemplate = new RestTemplate();
        String createNewFinanceAccountURI = financeBaseURI + "/api/auth/signup";

        restTemplate.postForObject(createNewFinanceAccountURI, newUserDTO, String.class);

        // Sent back the response
        return ResponseEntity.ok(newUser);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<AuthenticationResponseDTO> userLogin(@RequestBody LoginUserRequestDTO request) {
        return ResponseEntity.ok(userService.logUserIn(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDTO> authenticate(@RequestHeader HttpHeaders header) {
        return ResponseEntity.ok(userService.authenticate(header));
    }
}
