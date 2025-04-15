package com.example.CookBook.mapper;

import com.example.CookBook.dtos.responses.IngredientDto;
import com.example.CookBook.entities.Ingredient;
import org.springframework.stereotype.Component;

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
