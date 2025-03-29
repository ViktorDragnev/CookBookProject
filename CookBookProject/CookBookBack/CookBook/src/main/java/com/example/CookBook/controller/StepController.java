package com.example.CookBook.controller;

import com.example.CookBook.dtos.StepDto;
import com.example.CookBook.entities.Step;
import com.example.CookBook.services.StepService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/steps")
public class StepController {

    private final StepService stepService;

    public StepController(StepService stepService) {
        this.stepService = stepService;
    }

    @PostMapping
    public ResponseEntity<StepDto> addStep(@RequestBody StepDto stepDto){
        StepDto step = stepService.createStep(stepDto);
        return new ResponseEntity<>(step, HttpStatus.CREATED);
    }
}
