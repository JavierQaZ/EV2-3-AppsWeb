package cl.ucm.bookapi.ApiBook.service;

import cl.ucm.bookapi.ApiBook.dto.out.FineDtoOut;
import cl.ucm.bookapi.ApiBook.repository.FineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FineServiceImpl implements FineService{

    @Autowired
    private FineRepository fineRepository;

    @Override
    public List<FineDtoOut> getFineByUser(String email) {
        return fineRepository.findByUserFk(email).stream()
                .map(fine -> {
                    FineDtoOut dto = new FineDtoOut();
                    dto.setId(fine.getId());
                    dto.setAmount(fine.getAmount());
                    dto.setDescription(fine.getDescription());
                    dto.setState(fine.getState());
                    return dto;
                }).collect(Collectors.toList());
    }
}
