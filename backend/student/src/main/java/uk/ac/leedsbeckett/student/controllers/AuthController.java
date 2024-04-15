package uk.ac.leedsbeckett.student.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.AuthenticationResponseDTO;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.LoginUserRequestDTO;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.RegisterNewUserRequestDTO;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.UpdateUserRequestDTO;
import uk.ac.leedsbeckett.student.services.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    @PostMapping(path = "/signup")
    public ResponseEntity<AuthenticationResponseDTO> createNewUser(
            @RequestBody @Valid RegisterNewUserRequestDTO request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @PostMapping(path = "/login")
    public ResponseEntity<AuthenticationResponseDTO> userLogin(@RequestBody LoginUserRequestDTO request) {
        return ResponseEntity.ok(userService.logUserIn(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDTO> authenticate(@RequestHeader HttpHeaders header) {
        return ResponseEntity.ok(userService.authenticate(header));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestHeader HttpHeaders header, @RequestBody UpdateUserRequestDTO request) {
        return ResponseEntity.ok(userService.updateUser(header, request));
    }
}
