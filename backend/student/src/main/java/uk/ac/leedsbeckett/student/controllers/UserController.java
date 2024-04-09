package uk.ac.leedsbeckett.student.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.GetAllEnrolledCoursesDTO;
import uk.ac.leedsbeckett.student.domain.dto.userDTOs.GetBalanceDTO;
import uk.ac.leedsbeckett.student.services.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/enrolled-courses")
    public ResponseEntity<GetAllEnrolledCoursesDTO> getEnrolledCourses(@RequestHeader HttpHeaders header) {
        return ResponseEntity.ok(userService.getEnrolledCourses(header));
    }

    @GetMapping("/check-balance")
    public ResponseEntity<GetBalanceDTO> checkBalance(@RequestHeader HttpHeaders header) {
        return ResponseEntity.ok(userService.checkBalance(header));
    }

    @PutMapping("/enroll/{courseId}")
    public ResponseEntity<String> enrollStudentIntoCourse(@RequestHeader HttpHeaders header,
            @PathVariable String courseId) {
        return ResponseEntity.ok(userService.enrollStudentIntoCourse(header, courseId));
    }
}
