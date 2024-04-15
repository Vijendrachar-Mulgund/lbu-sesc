package uk.ac.leedsbeckett.library.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.ac.leedsbeckett.library.domain.dto.bookDTOs.GetAllBooksDTO;
import uk.ac.leedsbeckett.library.domain.dto.bookDTOs.GetBookDTO;
import uk.ac.leedsbeckett.library.services.BookService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book")
public class BookController {
    private final BookService bookService;

    @GetMapping
    public ResponseEntity<GetAllBooksDTO> insertManyBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<GetBookDTO> getBookByID(@PathVariable Integer isbn) {
        return ResponseEntity.ok(bookService.getBookById(isbn));
    }
}
