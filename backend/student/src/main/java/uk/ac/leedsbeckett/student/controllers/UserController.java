package uk.ac.leedsbeckett.student.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.ac.leedsbeckett.student.domain.dto.AuthenticationResponse;
import uk.ac.leedsbeckett.student.domain.dto.SignupRequestDTO;
import uk.ac.leedsbeckett.student.services.impl.UserServiceImpl;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<AuthenticationResponse> signUpCreateUser(@RequestBody SignupRequestDTO request) {

        return ResponseEntity.ok(userService.createUser(request));
    }
}
