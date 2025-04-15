package com.example.CookBook.mapper;

import com.example.CookBook.dtos.responses.StepDto;
import com.example.CookBook.entities.Step;
import org.springframework.stereotype.Component;

@Component
public class StepMapper {

    public static StepDto toDto(Step step) {
        return new StepDto(step.getStep());
    }


    public static Step toEntity(StepDto stepDto) {
        return new Step(stepDto.getStep());
    }


}
