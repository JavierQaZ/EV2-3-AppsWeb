package cl.ucm.bookapi.ApiBook.controller;

import cl.ucm.bookapi.ApiBook.dto.in.BookingDtoIn;
import cl.ucm.bookapi.ApiBook.dto.in.ReturnDto;
import cl.ucm.bookapi.ApiBook.dto.out.BookingDtoOut;
import cl.ucm.bookapi.ApiBook.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/new")
    public BookingDtoOut createBooking(@RequestBody BookingDtoIn dto) {
        return bookingService.createBooking(dto);
    }

    @PostMapping("/return/{id}")
    public BookingDtoOut returnBook(@PathVariable Integer id, @RequestBody ReturnDto dto) {
        return bookingService.returnBook(id, dto);
    }

    @GetMapping("/user/{email}")
    public List<BookingDtoOut> getUserBookings(@PathVariable String email) {
        return bookingService.getBookingByUser(email);
    }
}
