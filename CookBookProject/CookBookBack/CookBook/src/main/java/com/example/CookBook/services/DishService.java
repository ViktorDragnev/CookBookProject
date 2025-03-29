package com.example.CookBook.services;

import com.example.CookBook.dtos.DishDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DishService {

    DishDto addDish(DishDto dishDto);

    DishDto addImageToDish(Long id, MultipartFile file) throws IOException;

    DishDto deleteDish(String name);

    List<DishDto> getDishes();

    DishDto getDishById(Long id);
}
