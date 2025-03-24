package com.example.CookBook.services.implementation;

import com.example.CookBook.dtos.DishDto;
import com.example.CookBook.dtos.IngredientDto;
import com.example.CookBook.dtos.StepDto;
import com.example.CookBook.entities.Dish;
import com.example.CookBook.entities.Ingredient;
import com.example.CookBook.entities.Step;
import com.example.CookBook.mapper.DishMapper;
import com.example.CookBook.mapper.IngredientMapper;
import com.example.CookBook.mapper.StepMapper;
import com.example.CookBook.repositories.DishRepository;
import com.example.CookBook.repositories.IngredientRepository;
import com.example.CookBook.repositories.StepRepository;
import com.example.CookBook.services.DishService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DishServiceImpl implements DishService {

    private final DishRepository dishRepository;
    private final IngredientRepository ingredientRepository;
    private final StepRepository stepRepository;

    public DishServiceImpl(DishRepository dishRepository, IngredientRepository ingredientRepository, StepRepository stepRepository) {
        this.dishRepository = dishRepository;
        this.ingredientRepository = ingredientRepository;
        this.stepRepository = stepRepository;
    }

    @Override
    public DishDto addDish(DishDto dishDto) {
        Dish dish = new Dish(dishDto.getName(), dishDto.getDescription(), dishDto.getPrepTime());

        /*List<Ingredient> ingredients = new ArrayList<>();
        for (IngredientDto ingredientDto : dishDto.getIngredientList()) {
            Ingredient ingredient = IngredientMapper.toEntity(ingredientDto);
            ingredient.getDishes().add(dish);
            ingredients.add(ingredient);
        }
        ingredientRepository.saveAll(ingredients);

         */
        List<Ingredient> ingredients = DishMapper.toListIngredientEntity(dishDto.getIngredientList());
        ingredientRepository.saveAll(ingredients);
        dish.setIngredientList(ingredients);

        /*
        List<Step> steps = new ArrayList<>();
        for (StepDto stepDto : dishDto.getSteps()) {
            Step step = StepMapper.toEntity(stepDto);
            step.getDishes().add(dish);
            steps.add(step);
        }
        stepRepository.saveAll(steps);
         */

        List<Step> steps = DishMapper.toListStepEntity(dishDto.getSteps());
        stepRepository.saveAll(steps);
        dish.setSteps(steps);

        dishRepository.save(dish);

        DishDto finalDishDto = DishMapper.toDto(dish);
        finalDishDto.setIngredientList(DishMapper.toListIngredientDto(dish.getIngredientList()));
        finalDishDto.setSteps(DishMapper.toListStepDto(dish.getSteps()));

        return finalDishDto;
    }

    @Override
    public DishDto deleteDish(String name) {
        Optional<Dish> dish = dishRepository.findByName(name);

        if (dish.isEmpty()) {
            throw new RuntimeException("Dish with name '" + name + "' not found.");
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
            dishDto.setDescription(dish.getDescription());
            dishDto.setPrepTime(dish.getPrepTime());
            dishDto.setSteps(DishMapper.toListStepDto(dish.getSteps()));
            dishDto.setIngredientList(DishMapper.toListIngredientDto(dish.getIngredientList()));
            dishDtoList.add(dishDto);
        }
        return dishDtoList;
    }
}
