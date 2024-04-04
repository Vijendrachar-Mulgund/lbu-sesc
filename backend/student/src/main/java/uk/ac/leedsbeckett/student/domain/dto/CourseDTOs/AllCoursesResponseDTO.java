package uk.ac.leedsbeckett.student.domain.dto.CourseDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.ac.leedsbeckett.student.domain.entities.CourseEntity;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AllCoursesResponseDTO {

    private String status;

    private String message;

    private List<CourseEntity> courses;
}
