package cl.ucm.bookapi.ApiBook.controller;

import cl.ucm.bookapi.ApiBook.dto.in.BookDtoIn;
import cl.ucm.bookapi.ApiBook.dto.out.BookDtoOut;
import cl.ucm.bookapi.ApiBook.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/type/{type}")
    public List<BookDtoOut> getBooksByType(@PathVariable String type) {
        return bookService.getBooksByType(type);
    }

    @GetMapping("/title/{title}")
    public List<BookDtoOut> getBooksByTitle(@PathVariable String title) {
        return bookService.getBooksByTitle(title);
    }

    @PostMapping("/new")
    public void createBook(@RequestBody BookDtoIn dto) {
        bookService.createBook(dto);
    }
}
