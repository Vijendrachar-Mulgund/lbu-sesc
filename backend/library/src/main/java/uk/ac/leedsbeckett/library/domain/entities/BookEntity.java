package uk.ac.leedsbeckett.library.domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "books")
public class BookEntity {

    @Id
    private Integer isbn;

    private String title;

    private String author;

    private Integer year;

    private Integer copies;
}
