package com.example.CookBook.services;

import com.example.CookBook.dtos.DishDto;

import java.util.List;

public interface DishService {

    DishDto addDish(DishDto dishDto);

    DishDto deleteDish(String name);

    List<DishDto> getDishes();
}
