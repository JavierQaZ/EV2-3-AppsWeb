package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.CopyBookDtoIn;
import cl.ucm.bookapi.ApiBook.entities.CopyBookEntity;

import java.util.List;

public interface CopyBookService {
    void createCopy(CopyBookDtoIn dto);
    List<CopyBookEntity> getAvailableCopiesByTitle(String title);
}
