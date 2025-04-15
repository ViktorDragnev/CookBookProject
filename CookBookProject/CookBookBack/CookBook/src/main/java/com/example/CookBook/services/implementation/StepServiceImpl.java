package com.example.CookBook.services.implementation;

import com.example.CookBook.dtos.responses.StepDto;
import com.example.CookBook.mapper.StepMapper;
import com.example.CookBook.repositories.StepRepository;
import com.example.CookBook.services.StepService;
import org.springframework.stereotype.Service;

@Service
public class StepServiceImpl implements StepService {

    private StepRepository stepRepository;

    public StepServiceImpl(StepRepository stepRepository) {
        this.stepRepository = stepRepository;
    }

    @Override
    public StepDto createStep(StepDto stepDto) {
        stepRepository.save(StepMapper.toEntity(stepDto));
        return null;
    }
}
