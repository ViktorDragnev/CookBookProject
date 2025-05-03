package com.example.CookBook.mapper;

import com.example.CookBook.dtos.requests.DishDto;
import com.example.CookBook.dtos.responses.IngredientDto;
import com.example.CookBook.dtos.responses.SimpleDishDto;
import com.example.CookBook.dtos.responses.StepDto;
import com.example.CookBook.entities.Dish;
import com.example.CookBook.entities.Ingredient;
import com.example.CookBook.entities.Step;
import com.example.CookBook.entities.UserEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DishMapper {

    public static DishDto toDto(Dish dish) {
        return new DishDto(
                dish.getName(),
                dish.getDishType(),
                dish.getDescription(),
                dish.getPrepTime()
        );
    }

    public static Dish toEntity(DishDto dishDto) {
        return new Dish(
                dishDto.getName(),
                dishDto.getDishType(),
                dishDto.getDescription(),
                dishDto.getPrepTime()
        );
    }

    public static List<Ingredient> toListIngredientEntity(List<IngredientDto> ingredientDtoList){
        List<Ingredient> ingredients = new ArrayList<>();

        for(IngredientDto ingredientDto : ingredientDtoList){
            Ingredient ingredient = IngredientMapper.toEntity(ingredientDto);
            ingredients.add(ingredient);
        }

        return ingredients;
    }

    public static List<IngredientDto> toListIngredientDto(List<Ingredient> ingredientList){
        List<IngredientDto> ingredients = new ArrayList<>();

        for(Ingredient ingredient : ingredientList){
            IngredientDto ingredientDto = IngredientMapper.toDto(ingredient);
            ingredients.add(ingredientDto);
        }

        return ingredients;
    }

    public static List<Step> toListStepEntity(List<StepDto> stepDtoList){
        List<Step> steps = new ArrayList<>();

        for(StepDto stepDto : stepDtoList){
            Step step = StepMapper.toEntity(stepDto);
            steps.add(step);
        }

        return steps;
    }

    public static List<StepDto> toListStepDto(List<Step> stepList){
        List<StepDto> stepDtoList = new ArrayList<>();

        for(Step step : stepList){
            StepDto stepDto = StepMapper.toDto(step);
            stepDtoList.add(stepDto);
        }

        return stepDtoList;
    }

    public static List<SimpleDishDto> toListSimpleDishEntity(List<Dish> dishList){
        List<SimpleDishDto> simpleDishDtoList = new ArrayList<>();
        for(Dish dish : dishList){
            SimpleDishDto simpleDishDto = new SimpleDishDto(
                    dish.getName(),
                    dish.getDishType(),
                    dish.getDescription(),
                    dish.getPrepTime(),
                    dish.getImageName(),
                    dish.getImageType(),
                    dish.getImage(),
                    toListIngredientDto(dish.getIngredientList()),
                    toListStepDto(dish.getSteps())
            );
            simpleDishDtoList.add(simpleDishDto);
        }
        return simpleDishDtoList;
    }

    public static List<DishDto> toListDishDto(List<Dish> dishList) {
        List<DishDto> dishDtoList = new ArrayList<>();
        for (Dish dish : dishList) {
            DishDto dishDto = new DishDto();
            dishDto.setName(dish.getName());
            dishDto.setUser(UserMapper.mapToDto(dish.getUser()));
            dishDto.setDishType(dish.getDishType());
            dishDto.setImage(dish.getImage());
            dishDto.setDescription(dish.getDescription());
            dishDto.setPrepTime(dish.getPrepTime());
            dishDto.setSteps(DishMapper.toListStepDto(dish.getSteps()));
            dishDto.setIngredientList(DishMapper.toListIngredientDto(dish.getIngredientList()));
            dishDtoList.add(dishDto);
        }
        return dishDtoList;
    }

    public static DishDto toCompleteDto(Dish dish) {
        DishDto dishDto = new DishDto();
        dishDto.setUser(UserMapper.mapToDto(dish.getUser()));
        dishDto.setImageName(dish.getImageName());
        dishDto.setImageType(dish.getImageType());
        dishDto.setImage(dish.getImage());
        dishDto.setIngredientList(DishMapper.toListIngredientDto(dish.getIngredientList()));
        dishDto.setSteps(DishMapper.toListStepDto(dish.getSteps()));
        return dishDto;
    }
}
