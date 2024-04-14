package uk.ac.leedsbeckett.library.domain.dto.bookDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.ac.leedsbeckett.library.domain.entities.BookEntity;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetAllBooksDTO {
    private String status;

    private String message;

    private List<BookEntity> books;
}
