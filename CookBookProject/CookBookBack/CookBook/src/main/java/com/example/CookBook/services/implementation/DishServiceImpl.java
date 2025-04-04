package com.example.CookBook.services.implementation;

import com.example.CookBook.dtos.DishDto;
import com.example.CookBook.dtos.IngredientDto;
import com.example.CookBook.dtos.StepDto;
import com.example.CookBook.entities.Dish;
import com.example.CookBook.entities.Ingredient;
import com.example.CookBook.entities.Step;
import com.example.CookBook.enums.DishType;
import com.example.CookBook.mapper.DishMapper;
import com.example.CookBook.mapper.IngredientMapper;
import com.example.CookBook.mapper.StepMapper;
import com.example.CookBook.repositories.DishRepository;
import com.example.CookBook.repositories.IngredientRepository;
import com.example.CookBook.repositories.StepRepository;
import com.example.CookBook.services.DishService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DishServiceImpl implements DishService {

    private final DishRepository dishRepository;

    public DishServiceImpl(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    @Override
    public DishDto addDish(DishDto dishDto) {
        Dish dish = DishMapper.toEntity(dishDto);

        List<Ingredient> ingredients = DishMapper.toListIngredientEntity(dishDto.getIngredientList());

        dish.setIngredientList(ingredients);

        List<Step> steps = DishMapper.toListStepEntity(dishDto.getSteps());

        dish.setSteps(steps);

        dishRepository.save(dish);

        return dishDto;
    }

    @Override
    public DishDto addImageToDish(Long id, MultipartFile file) {
        Optional<Dish> dish = dishRepository.findById(id);
        Dish realDish = null;

        if (dish.isPresent()) {
            realDish = dish.get();
        }

        try {
            realDish.setImageName(file.getOriginalFilename());
            realDish.setImageType(file.getContentType());
            realDish.setImage(file.getBytes());
            dishRepository.save(realDish);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return DishMapper.toDto(realDish);
    }


    @Override
    public DishDto deleteDish(Long id) {
        Optional<Dish> dish = dishRepository.findById(id);

        if (dish.isEmpty()) {
            throw new RuntimeException("Dish not found.");
        }

        DishDto dishDto = DishMapper.toDto(dish.get());
        dishRepository.delete(dish.get());
        return dishDto;
    }


    @Override
    public List<DishDto> getDishes() {
        List<Dish> dishes = dishRepository.findAll();

        if(dishes.isEmpty()){
            throw new NullPointerException();
        }

        DishDto dishDto = new DishDto();
        List<DishDto> dishDtoList = new ArrayList<>();
        for (Dish dish : dishes){
            dishDto.setName(dish.getName());
            dishDto.setImage(dish.getImage());
            dishDto.setDescription(dish.getDescription());
            dishDto.setPrepTime(dish.getPrepTime());
            dishDto.setSteps(DishMapper.toListStepDto(dish.getSteps()));
            dishDto.setIngredientList(DishMapper.toListIngredientDto(dish.getIngredientList()));
            dishDtoList.add(dishDto);
        }
        return dishDtoList;
    }

    @Override
    public DishDto getDishById(Long id) {
        Optional<Dish> dish = dishRepository.findById(id);
        DishDto dishDto = DishMapper.toDto(dish.get());
        dishDto.setImageName(dishDto.getImageName());
        dishDto.setImageType(dishDto.getImageType());
        dishDto.setImage(dish.get().getImage());
        dishDto.setIngredientList(DishMapper.toListIngredientDto(dish.get().getIngredientList()));
        dishDto.setSteps(DishMapper.toListStepDto(dish.get().getSteps()));
        return dishDto;
    }

    @Override
    public List<DishDto> displayDishesByType(DishType dishType) {
        return dishRepository.findByDishType(dishType);
    }
}
