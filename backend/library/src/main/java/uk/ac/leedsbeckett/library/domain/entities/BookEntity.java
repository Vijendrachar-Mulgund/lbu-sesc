package uk.ac.leedsbeckett.library.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
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

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<BorrowedBooksEntity> students = new HashSet<>();
}
