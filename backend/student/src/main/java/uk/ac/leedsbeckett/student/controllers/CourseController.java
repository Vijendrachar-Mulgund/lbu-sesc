package uk.ac.leedsbeckett.student.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.ac.leedsbeckett.student.domain.dto.CourseDTOs.CreateNewCourseRequestDTO;
import uk.ac.leedsbeckett.student.services.CourseService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/course")
public class CourseController {

    private final CourseService CourseService;

    @PostMapping
    public ResponseEntity<String> createCourse(@RequestBody CreateNewCourseRequestDTO request) {
        return ResponseEntity.ok(CourseService.createNewCourse(request));
    }
}
