package com.example.CookBook.services;

import com.example.CookBook.dtos.requests.DishDto;
import com.example.CookBook.enums.DishType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DishService {

    DishDto addDish(DishDto dishDto, String token);

    DishDto addDishNoAuth(DishDto dishDto);

    DishDto addImageToDish(String name, MultipartFile file) throws IOException;

    DishDto deleteDish(String dishName, String email);

    DishDto deleteDishTest(String dishName);

    List<DishDto> getDishes();

    DishDto getDishByName(String name);

    List<DishDto> displayDishesByType(DishType dishType);

    boolean dishNameExists(String name);

    List<DishDto> findDishesContainingMatchingIngredient(List<String> ingredientDtoList);
}
