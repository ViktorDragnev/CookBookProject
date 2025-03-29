package com.example.CookBook.controller;

import com.example.CookBook.dtos.DishDto;
import com.example.CookBook.services.DishService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "api/dishes")
public class DishController {

    private final DishService dishService;

    public DishController(DishService dishService) {
        this.dishService = dishService;
    }

    @PostMapping(path = "/addDish")
    public ResponseEntity<?> addDish(@RequestPart DishDto dishDto) {
        DishDto dish = dishService.addDish(dishDto);
        return new ResponseEntity<>(dish, HttpStatus.CREATED);
    }

    @PutMapping(path = "/addDish/{id}")
    public ResponseEntity<?> updateDish(@RequestPart MultipartFile image, @PathVariable Long id) {
        try {
            DishDto dishDto = dishService.addImageToDish(id, image);
            return new ResponseEntity<>(dishDto, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DishDto> getDishById(@PathVariable Long id) {
        return new ResponseEntity<>(dishService.getDishById(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        DishDto dish = dishService.getDishById(id);
        byte[] image = dish.getImage();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.valueOf(dish.getImageType()));
        return new ResponseEntity<>(image, httpHeaders, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<DishDto>> getAllDishes(){
        List<DishDto> dishDtoList = dishService.getDishes();
        return new ResponseEntity<>(dishDtoList, HttpStatus.OK);
    }
}
