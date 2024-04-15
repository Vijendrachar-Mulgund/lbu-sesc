package uk.ac.leedsbeckett.library.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.ac.leedsbeckett.library.domain.dto.bookDTOs.GetAllBorrowedBooks;
import uk.ac.leedsbeckett.library.services.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/borrow/{isbn}")
    public ResponseEntity<String> borrowBook(@RequestHeader HttpHeaders header, @PathVariable Integer isbn ) {
        return ResponseEntity.ok(userService.borrowBook(header, isbn));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<GetAllBorrowedBooks> getBorrowedBooks(@RequestHeader HttpHeaders header) {
        return ResponseEntity.ok(userService.getBorrowedBooks(header));
    }

    @PostMapping("/return/{borrowId}")
    public ResponseEntity<String> returnBook(@RequestHeader HttpHeaders header, @PathVariable String borrowId ) {
        return ResponseEntity.ok(userService.returnBook(header, borrowId));
    }
}
