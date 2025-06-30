package cl.ucm.bookapi.ApiBook.controller;

import cl.ucm.bookapi.ApiBook.dto.in.CopyBookDtoIn;
import cl.ucm.bookapi.ApiBook.entities.CopyBookEntity;
import cl.ucm.bookapi.ApiBook.service.CopyBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/copy")
public class CopyBookController {

    @Autowired
    private CopyBookService copyBookService;

    @PostMapping("/new")
    public void createCopy(@RequestBody CopyBookDtoIn dto) {
        copyBookService.createCopy(dto);
    }

    @GetMapping("/available/{title}")
    public List<CopyBookEntity> getAvailableCopies(@PathVariable String title) {
        return copyBookService.getAvailableCopiesByTitle(title);
    }
}
