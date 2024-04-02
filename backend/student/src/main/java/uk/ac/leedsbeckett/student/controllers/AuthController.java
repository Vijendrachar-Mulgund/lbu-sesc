package uk.ac.leedsbeckett.student.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.ac.leedsbeckett.student.domain.dto.AuthenticationResponseDTO;
import uk.ac.leedsbeckett.student.domain.dto.LoginUserRequestDTO;
import uk.ac.leedsbeckett.student.domain.dto.RegisterNewUserRequestDTO;
import uk.ac.leedsbeckett.student.services.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    @PostMapping(path = "/register")
    public ResponseEntity<AuthenticationResponseDTO> registerNewUser(@RequestBody RegisterNewUserRequestDTO request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @PostMapping(path = "/login")
    public ResponseEntity<AuthenticationResponseDTO> userLogin(@RequestBody LoginUserRequestDTO request) {
        return ResponseEntity.ok(userService.logUserIn(request));
    }
}
