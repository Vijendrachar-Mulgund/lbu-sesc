package uk.ac.leedsbeckett.student.domain.dto.userDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.ac.leedsbeckett.student.domain.entities.CourseEntity;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetAllEnrolledCoursesDTO {

    private String status;

    private String message;

    private Set<CourseEntity> enrolledCourses;
}
