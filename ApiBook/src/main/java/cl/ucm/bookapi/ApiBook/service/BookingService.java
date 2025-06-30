package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.in.BookingDtoIn;
import cl.ucm.bookapi.ApiBook.dto.in.ReturnDto;
import cl.ucm.bookapi.ApiBook.dto.out.BookingDtoOut;

import java.util.List;

public interface BookingService {
    BookingDtoOut createBooking(BookingDtoIn dto);
    BookingDtoOut returnBook(Integer bookingId, ReturnDto dto);
    List<BookingDtoOut> getBookingByUser(String email);
}
