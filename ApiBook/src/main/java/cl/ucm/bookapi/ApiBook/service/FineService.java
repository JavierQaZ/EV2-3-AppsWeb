package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.out.FineDtoOut;

import java.util.List;

public interface FineService {
    List<FineDtoOut> getFineByUser(String email);
}
