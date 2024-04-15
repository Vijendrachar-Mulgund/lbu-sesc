package uk.ac.leedsbeckett.library.domain.dto.bookDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.ac.leedsbeckett.library.domain.entities.BookEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetBookDTO {
    private String status;

    private String message;

    private BookEntity book;
}
