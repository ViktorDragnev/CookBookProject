package com.example.CookBook.controller;

import com.example.CookBook.dtos.requests.DishDto;
import com.example.CookBook.enums.DishType;
import com.example.CookBook.exceptions.UnauthorizedException;
import com.example.CookBook.repositories.DishRepository;
import com.example.CookBook.repositories.UserRepository;
import com.example.CookBook.security.JWTGenerator;
import com.example.CookBook.services.DishService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "api/dishes")
public class DishController {

    private final DishService dishService;
    private final UserRepository userRepository;
    private final DishRepository dishRepository;

    public DishController(DishService dishService, UserRepository userRepository, DishRepository dishRepository) {
        this.dishService = dishService;
        this.userRepository = userRepository;
        this.dishRepository = dishRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addDish(
            @RequestBody DishDto dishDto,
            @RequestHeader("Authorization") String token) {

        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = JWTGenerator.getUsernameFromJWT(jwt);

        if(dishService.dishNameExists(dishDto.getName())) {
            return new ResponseEntity<>("Dish exists!",HttpStatus.CONFLICT);
        }

        try {
            DishDto savedDishDto = dishService.addDish(dishDto, username);
            return new ResponseEntity<>(savedDishDto, HttpStatus.CREATED);
        } catch (UnauthorizedException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PatchMapping("/{name}/image")
    public ResponseEntity<DishDto> updateDishImage(
            @PathVariable String name,
            @RequestParam("image") MultipartFile image) {

        try {
            DishDto updatedDish = dishService.addImageToDish(name, image);
            return ResponseEntity.ok(updatedDish);

        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to process image",
                    e
            );
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    e.getMessage(),
                    e
            );
        }
    }

    @GetMapping("/{name}")
    public ResponseEntity<DishDto> getDishByName(@PathVariable String name) {
        return new ResponseEntity<>(dishService.getDishByName(name), HttpStatus.OK);
    }

    @GetMapping("/{name}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable String name) {
        DishDto dish = dishService.getDishByName(name);
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

    @GetMapping(path = "/type/{dishType}")
    public ResponseEntity<List<DishDto>> getDishesByDishType(@PathVariable DishType dishType) {
        List<DishDto> dishDtoList = dishService.displayDishesByType(dishType);
        return new ResponseEntity<>(dishDtoList, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{dishName}")
    public ResponseEntity<?> deleteDish(@PathVariable String dishName, @RequestHeader("Authorization") String token) {
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = JWTGenerator.getUsernameFromJWT(jwt);

        try {
            dishService.deleteDish(dishName, username);
            return ResponseEntity.ok("Dish deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @DeleteMapping(path = "/test/{dishName}")
    public ResponseEntity<?> deleteDishTest(@PathVariable String dishName) {
        DishDto dishDto = dishService.deleteDishTest(dishName);
        return new ResponseEntity<>(dishDto, HttpStatus.OK);
    }

    @GetMapping(path = "/filterByIngredients")
    public ResponseEntity<List<DishDto>> filterRecipesByIngredients(@RequestParam List<String> ingredients) {
        return new ResponseEntity<>(dishService.findDishesContainingMatchingIngredient(ingredients), HttpStatus.OK);
    }

    @GetMapping(path = "/searchByName/{name}")
    public ResponseEntity<List<DishDto>> searchByName(@PathVariable String name) {
        return new ResponseEntity<>(dishService.findDishesByName(name), HttpStatus.OK);
    }

    @PutMapping(path = "/updateDish/{name}")
    public ResponseEntity<String> updateDish(@PathVariable String name, @RequestBody DishDto dishDto, @RequestHeader("Authorization") String token) {
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = JWTGenerator.getUsernameFromJWT(jwt);

        if (dishDto != null) {
            dishService.updateDish(name, dishDto, username);
            return new ResponseEntity<>("Updated successfully", HttpStatus.OK);
        }

        return new ResponseEntity<>("Dish not found!", HttpStatus.NOT_FOUND);
    }

    @PutMapping(path = "/updateDish/{name}/image")
    public ResponseEntity<String> updateDish(@PathVariable String name, MultipartFile file, @RequestHeader("Authorization") String token) throws IOException {
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = JWTGenerator.getUsernameFromJWT(jwt);

        if (file != null) {
            dishService.updateDishImage(name, file, username);
            return new ResponseEntity<>("Updated successfully", HttpStatus.OK);
        }

        return new ResponseEntity<>("Dish not found!", HttpStatus.NOT_FOUND);
    }
}
