package uk.ac.leedsbeckett.student.domain.dto.CourseDTOs;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.ac.leedsbeckett.student.domain.enums.Currency;
import uk.ac.leedsbeckett.student.domain.enums.Department;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateNewCourseRequestDTO {
    private String courseName;

    private String courseDescription;

    private Double fees;

    private Currency currency;

    private Department department;
}
