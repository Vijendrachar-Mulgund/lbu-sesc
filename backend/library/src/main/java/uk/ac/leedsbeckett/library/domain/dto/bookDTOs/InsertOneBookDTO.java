package uk.ac.leedsbeckett.library.domain.dto.bookDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InsertOneBookDTO {

    private Integer isbn;

    private String title;

    private String author;

    private Integer year;

    private Integer copies;
}
