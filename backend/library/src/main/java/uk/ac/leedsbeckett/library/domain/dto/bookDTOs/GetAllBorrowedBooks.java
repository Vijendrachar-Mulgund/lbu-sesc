package uk.ac.leedsbeckett.library.domain.dto.bookDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.ac.leedsbeckett.library.domain.entities.BookEntity;
import uk.ac.leedsbeckett.library.domain.entities.BorrowedBooksEntity;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetAllBorrowedBooks {
    private String status;

    private String message;

    private Set<BorrowedBooksEntity> books;
}

