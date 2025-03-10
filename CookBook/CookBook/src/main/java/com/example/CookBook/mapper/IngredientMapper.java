package com.example.CookBook.mapper;

import com.example.CookBook.dtos.IngredientDto;
import com.example.CookBook.entities.Ingredient;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class IngredientMapper {

    public static IngredientDto toDto(Ingredient ingredient) {
        return new IngredientDto(
                ingredient.getName()

        );
    }

    public static Ingredient toEntity(IngredientDto ingredientDto) {
        return new Ingredient(
                ingredientDto.getName()
        );
    }


}
