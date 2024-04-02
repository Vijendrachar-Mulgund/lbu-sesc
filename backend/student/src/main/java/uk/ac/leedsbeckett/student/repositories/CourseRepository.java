package uk.ac.leedsbeckett.student.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.ac.leedsbeckett.student.domain.entities.CourseEntity;

public interface CourseRepository extends JpaRepository<CourseEntity, String> {
}
