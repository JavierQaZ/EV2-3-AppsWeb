package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.BookDtoIn;
import cl.ucm.bookapi.ApiBook.dto.out.BookDtoOut;
import cl.ucm.bookapi.ApiBook.entities.BookEntity;
import cl.ucm.bookapi.ApiBook.repository.BookRepository;
import cl.ucm.bookapi.ApiBook.repository.CopyBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CopyBookRepository copyBookRepository;

    @Override
    public List<BookDtoOut> getAllBooks() {
        List<BookEntity> books = bookRepository.findAll();
        return mapToDtoList(books);
    }

    @Override
    public List<BookDtoOut> getBooksByType(String type) {
        List<BookEntity> books = bookRepository.findByType(type);
        return mapToDtoList(books);
    }

    @Override
    public List<BookDtoOut> getBooksByTitle(String title) {
        List<BookEntity> books = bookRepository.findByTitleContainingIgnoreCase(title);
        return mapToDtoList(books);
    }

    @Override
    public void createBook(BookDtoIn dto) {
        BookEntity book = new BookEntity();
        book.setAuthor(dto.getAuthor());
        book.setTitle(dto.getTitle());
        book.setType(dto.getType());
        book.setImage64(dto.getImage64());
        bookRepository.save(book);
    }

    private List<BookDtoOut> mapToDtoList(List<BookEntity> books) {
        return books.stream().map(book -> {
            BookDtoOut dto = new BookDtoOut();
            dto.setId(book.getId());
            dto.setAuthor(book.getAuthor());
            dto.setTitle(book.getTitle());
            dto.setType(book.getType());

            boolean hasAvailable = copyBookRepository
                    .findByBookFkAndStateTrue(book.getId())
                    .stream()
                    .findAny()
                    .isPresent();

            dto.setAvailable(hasAvailable);
            return dto;
        }).collect(Collectors.toList());
    }
}
