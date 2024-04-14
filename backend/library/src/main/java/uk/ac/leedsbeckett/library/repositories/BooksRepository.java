package uk.ac.leedsbeckett.library.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.ac.leedsbeckett.library.domain.entities.BookEntity;

import java.util.Optional;

public interface BooksRepository extends JpaRepository<BookEntity, Integer> {
    Optional<BookEntity> findByIsbn(Integer isbn);

    Optional<BookEntity> findByTitle(String title);
}
