package com.example.CookBook.services;

import com.example.CookBook.dtos.requests.DishDto;
import com.example.CookBook.enums.DishType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DishService {

    DishDto addDish(DishDto dishDto, String token);

    DishDto addImageToDish(String name, MultipartFile file) throws IOException;

    void deleteDish(String dishName, String email);

    DishDto deleteDishTest(String dishName);

    List<DishDto> getDishes();

    DishDto getDishByName(String name);

    List<DishDto> displayDishesByType(DishType dishType);

    boolean dishNameExists(String name);

    List<DishDto> findDishesContainingMatchingIngredient(List<String> ingredientDtoList);

    List<DishDto> findDishesByName(String name);

    void updateDish(String dishName, DishDto dishDto, String username);

    void updateDishImage(String dishName, MultipartFile file, String username) throws IOException;
}
