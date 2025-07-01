package cl.ucm.bookapi.ApiBook.controller;

import cl.ucm.bookapi.ApiBook.dto.in.BookDtoIn;
import cl.ucm.bookapi.ApiBook.dto.out.BookDtoOut;
import cl.ucm.bookapi.ApiBook.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/all")
    public List<BookDtoOut> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/all/{type}")
    public List<BookDtoOut> getBooksByType(@PathVariable String type) {
        return bookService.getBooksByType(type);
    }

    @GetMapping("/find/{title}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<BookDtoOut> getBooksByTitle(@PathVariable String title) {
        return bookService.getBooksByTitle(title);
    }

    @PostMapping("/new")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void createBook(@RequestBody BookDtoIn dto) {
        bookService.createBook(dto);
    }
}
