package uk.ac.leedsbeckett.student.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import uk.ac.leedsbeckett.student.domain.enums.Currency;
import uk.ac.leedsbeckett.student.domain.enums.Department;

import java.util.Set;

@Getter
@Setter
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
    @JsonBackReference
    private Set<UserEntity> enrolledStudents;
}
