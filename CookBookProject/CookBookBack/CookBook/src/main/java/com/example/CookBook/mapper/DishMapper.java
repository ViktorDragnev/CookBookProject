package com.example.CookBook.mapper;

import com.example.CookBook.dtos.DishDto;
import com.example.CookBook.dtos.IngredientDto;
import com.example.CookBook.dtos.StepDto;
import com.example.CookBook.entities.Dish;
import com.example.CookBook.entities.Ingredient;
import com.example.CookBook.entities.Step;
import jakarta.servlet.annotation.MultipartConfig;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

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
}
