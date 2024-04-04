package uk.ac.leedsbeckett.student.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByStudentId(String studentId);
}
