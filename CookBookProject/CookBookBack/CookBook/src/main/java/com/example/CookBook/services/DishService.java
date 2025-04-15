package com.example.CookBook.services;

import com.example.CookBook.dtos.requests.DishDto;
import com.example.CookBook.dtos.responses.IngredientDto;
import com.example.CookBook.enums.DishType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DishService {

    DishDto addDish(DishDto dishDto, String token);

    DishDto addDishNoAuth(DishDto dishDto);

    DishDto addImageToDish(String name, MultipartFile file) throws IOException;

    DishDto deleteDish(Long dishId, String email);

    List<DishDto> getDishes();

    DishDto getDishByName(String name);

    List<DishDto> displayDishesByType(DishType dishType);

    boolean dishNameExists(String name);

    List<DishDto> findDishesContainingAnyIngredient(List<String> ingredientDtoList);
}
