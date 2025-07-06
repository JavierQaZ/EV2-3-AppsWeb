package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.CopyBookDtoIn;
import cl.ucm.bookapi.ApiBook.entities.BookEntity;
import cl.ucm.bookapi.ApiBook.entities.CopyBookEntity;
import cl.ucm.bookapi.ApiBook.repository.BookRepository;
import cl.ucm.bookapi.ApiBook.repository.CopyBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CopyBookServiceImpl implements CopyBookService{

    @Autowired
    private CopyBookRepository bookCopyRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public void createCopy(CopyBookDtoIn dto) {
        BookEntity book = bookRepository.findById(dto.getBookFk())
                .orElseThrow(() -> new RuntimeException("Libro no Encontrado"));

        CopyBookEntity copy = new CopyBookEntity();
        copy.setBookFk(book.getId());
        copy.setState(true);

        bookCopyRepository.save(copy);
    }

    @Override
    public List<CopyBookEntity> getAvailableCopiesByTitle(String title) {
        List<BookEntity> books = bookRepository.findByTitleContainingIgnoreCase(title);
        if (books.isEmpty()) return List.of();

        return books.stream()
                .flatMap(book -> bookCopyRepository
                        .findByBookFkAndStateTrue(book.getId()).stream())
                .collect(Collectors.toList());
    }
}
