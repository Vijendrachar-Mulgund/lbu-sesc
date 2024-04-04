package uk.ac.leedsbeckett.student.domain.dto.CourseDTOs;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "Please enter a valid course name")
    private String courseName;

    @NotBlank(message = "Please enter a valid course description")
    private String courseDescription;

    @NotBlank(message = "Please enter a valid course code")
    private Double fees;

    @NotBlank(message = "Please enter a valid course duration")
    private Currency currency;

    @NotBlank(message = "Please enter a valid course department")
    private Department department;
}
