package uk.ac.leedsbeckett.student.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.UserProfileResponseDTO;
import uk.ac.leedsbeckett.student.services.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponseDTO> getGraduationStatus(@RequestHeader HttpHeaders header) {
        return ResponseEntity.ok(userService.getUserProfileDetails(header));
    }

}
