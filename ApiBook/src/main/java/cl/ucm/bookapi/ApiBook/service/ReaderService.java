package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.ChangeStateDto;
import cl.ucm.bookapi.ApiBook.dto.out.ReaderDetailDto;

public interface ReaderService {
    ReaderDetailDto getReaderByEmail(String email);
    void updateState(String email, ChangeStateDto dto);
}
