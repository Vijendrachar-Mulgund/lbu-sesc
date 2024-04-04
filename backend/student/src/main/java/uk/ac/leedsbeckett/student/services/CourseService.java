package uk.ac.leedsbeckett.student.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uk.ac.leedsbeckett.student.domain.dto.CourseDTOs.AllCoursesResponseDTO;
import uk.ac.leedsbeckett.student.domain.dto.CourseDTOs.CreateNewCourseRequestDTO;
import uk.ac.leedsbeckett.student.domain.entities.CourseEntity;
import uk.ac.leedsbeckett.student.repositories.CourseRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public String createNewCourse(CreateNewCourseRequestDTO request) {

        CourseEntity course = CourseEntity.builder()
                .courseName(request.getCourseName())
                .courseDescription(request.getCourseDescription())
                .fees(request.getFees())
                .currency(request.getCurrency())
                .department(request.getDepartment())
                .build();

        courseRepository.save(course);

        return "Course created";
    }

    public AllCoursesResponseDTO getAllCourses() {

        List<CourseEntity> courses = courseRepository.findAll();

        return AllCoursesResponseDTO.builder()
                .status("success")
                .message("All courses fetched successfully")
                .courses(courses)
                .build();
    }

}
