package uk.ac.leedsbeckett.library.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uk.ac.leedsbeckett.library.domain.dto.bookDTOs.GetAllBooksDTO;
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
}
