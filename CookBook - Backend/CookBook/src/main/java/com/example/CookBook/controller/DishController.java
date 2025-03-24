package com.example.CookBook.controller;

import com.example.CookBook.dtos.DishDto;
import com.example.CookBook.services.DishService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/dishes")
public class DishController {

    private DishService dishService;

    public DishController(DishService dishService) {
        this.dishService = dishService;
    }

    @PutMapping(path = "/addDish")
    public ResponseEntity<DishDto> addDish(@RequestBody DishDto dishDto){
        DishDto dish = dishService.addDish(dishDto);
        return new ResponseEntity<>(dish,HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<DishDto>> getAllDishes(){
        List<DishDto> dishDtoList = dishService.getDishes();
        return new ResponseEntity<>(dishDtoList, HttpStatus.OK);
    }
}
