package uk.ac.leedsbeckett.library.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uk.ac.leedsbeckett.library.domain.dto.bookDTOs.GetAllBooksDTO;
import uk.ac.leedsbeckett.library.domain.dto.bookDTOs.GetBookDTO;
import uk.ac.leedsbeckett.library.domain.dto.bookDTOs.InsertOneBookDTO;
import uk.ac.leedsbeckett.library.domain.entities.BookEntity;
import uk.ac.leedsbeckett.library.repositories.BooksRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BooksRepository booksRepository;

    public GetAllBooksDTO getAllBooks() {
        List<BookEntity> allBooks = booksRepository.findAll();

        return GetAllBooksDTO.builder()
                .status("success")
                .message("All books received successfully")
                .books(allBooks)
                .build();
    }

    public GetBookDTO getBookById(Integer isbn) {
        BookEntity book = booksRepository.findByIsbn(isbn).orElseThrow();

        return GetBookDTO.builder()
                .status("success")
                .message("Book received successfully")
                .book(book)
                .build();
    }

    public String insertBook( InsertOneBookDTO request) {

        BookEntity book = BookEntity.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .year(request.getYear())
                .isbn(request.getIsbn())
                .copies(request.getCopies())
                .build();

        booksRepository.save(book);

        return "Book inserted successfully";
    }
}
