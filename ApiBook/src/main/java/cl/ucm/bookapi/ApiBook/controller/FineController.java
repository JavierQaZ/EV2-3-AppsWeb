package cl.ucm.bookapi.ApiBook.controller;

import cl.ucm.bookapi.ApiBook.dto.out.FineDtoOut;
import cl.ucm.bookapi.ApiBook.service.FineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fine")
public class FineController {

    @Autowired
    private FineService fineService;

    @GetMapping("/user/{email}")
    public List<FineDtoOut> getUserFines(@PathVariable String email) {
        return fineService.getFineByUser(email);
    }
}
