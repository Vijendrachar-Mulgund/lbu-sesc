package uk.ac.leedsbeckett.library.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.ac.leedsbeckett.library.domain.dto.userDTOs.AuthenticationResponseDTO;
import uk.ac.leedsbeckett.library.domain.dto.userDTOs.LoginUserRequestDTO;
import uk.ac.leedsbeckett.library.domain.dto.userDTOs.RegisterNewUserRequestDTO;
import uk.ac.leedsbeckett.library.domain.dto.userDTOs.RequestChangePinDTO;
import uk.ac.leedsbeckett.library.services.UserService;

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

    @PostMapping("/change-pin/{email}")
    public ResponseEntity<AuthenticationResponseDTO> changePin(@RequestBody RequestChangePinDTO request, @PathVariable String email) {
        return ResponseEntity.ok(userService.changePin(request, email));
    }
}
