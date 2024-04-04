package uk.ac.leedsbeckett.student.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.ac.leedsbeckett.student.domain.enums.Currency;
import uk.ac.leedsbeckett.student.domain.enums.Department;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name= "courses")
public class CourseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String courseName;

    private String courseDescription;

    private Double fees;

    @Enumerated(EnumType.STRING)
    private Currency currency;

    @Enumerated(EnumType.STRING)
    private Department department;

    @ManyToMany(mappedBy = "enrolledCourses", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<UserEntity> enrolledStudents;
}
