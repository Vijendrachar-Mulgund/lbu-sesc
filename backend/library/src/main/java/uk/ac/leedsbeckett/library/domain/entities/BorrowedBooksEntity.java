package uk.ac.leedsbeckett.library.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "borrowed_books")
public class BorrowedBooksEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;

    @ManyToOne
    @JsonIgnore
    @JsonManagedReference
    @JoinColumn(name= "student_id", referencedColumnName = "id")
    private UserEntity student;

    @ManyToOne
    @JsonIgnore
    @JsonManagedReference
    @JoinColumn(name = "book_isbn", referencedColumnName = "isbn")
    private BookEntity book;

    private Integer isbn;

    private String title;

    private Date borrowedDate;

    private Date dueDate;

    private Date returnedDate;
}
