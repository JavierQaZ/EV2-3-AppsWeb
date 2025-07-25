package cl.ucm.bookapi.ApiBook.controller;

import cl.ucm.bookapi.ApiBook.dto.in.ChangeStateDto;
import cl.ucm.bookapi.ApiBook.dto.out.ReaderDetailDto;
import cl.ucm.bookapi.ApiBook.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reader")
public class ReaderController {

    @Autowired
    private ReaderService readerService;

    @GetMapping("/find/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ReaderDetailDto getReader(@PathVariable String email) {
        return readerService.getReaderByEmail(email);
    }

    @PutMapping("/state/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void updateState(@PathVariable String email, @RequestBody ChangeStateDto dto) {
        readerService.updateState(email, dto);
    }
}
