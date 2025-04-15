package com.example.CookBook.services;

import com.example.CookBook.dtos.responses.StepDto;

public interface StepService {

    StepDto createStep(StepDto stepDto);
}
