package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.BookDtoIn;
import cl.ucm.bookapi.ApiBook.dto.out.BookDtoOut;

import java.util.List;

public interface BookService {
    List<BookDtoOut> getAllBooks();
    List<BookDtoOut> getBooksByType(String type);
    List<BookDtoOut> getBooksByTitle(String title);
    void createBook(BookDtoIn dto);
}
