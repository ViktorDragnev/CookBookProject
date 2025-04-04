package com.example.CookBook.services;

import com.example.CookBook.dtos.DishDto;
import com.example.CookBook.enums.DishType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DishService {

    DishDto addDish(DishDto dishDto);

    DishDto addImageToDish(Long id, MultipartFile file) throws IOException;

    DishDto deleteDish(Long id);

    List<DishDto> getDishes();

    DishDto getDishById(Long id);

    List<DishDto> displayDishesByType(DishType dishType);
}
