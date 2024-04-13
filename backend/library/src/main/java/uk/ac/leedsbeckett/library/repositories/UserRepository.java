package uk.ac.leedsbeckett.library.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.ac.leedsbeckett.library.domain.entities.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByStudentId(String studentId);
}
