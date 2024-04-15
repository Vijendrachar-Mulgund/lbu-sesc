package uk.ac.leedsbeckett.library.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.ac.leedsbeckett.library.domain.entities.BorrowedBooksEntity;

import java.util.Set;

public interface BorrowedBooksRepository extends JpaRepository<BorrowedBooksEntity, String> {
    Set<BorrowedBooksEntity> findAllByStudentId(String id);
}
