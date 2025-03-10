package com.example.CookBook.dtos;

import java.util.ArrayList;
import java.util.List;

public class DishDto {
    String name;
    List<IngredientDto> ingredientList = new ArrayList<>();
    String description;
    String prepTime;
    List<StepDto> steps = new ArrayList<>();

    public DishDto() {
    }

    public DishDto(String name, String description, String prepTime) {
        this.name = name;
        this.description = description;
        this.prepTime = prepTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<IngredientDto> getIngredientList() {
        return ingredientList;
    }

    public void setIngredientList(List<IngredientDto> ingredientList) {
        this.ingredientList = ingredientList;
    }

    public String getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(String prepTime) {
        this.prepTime = prepTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<StepDto> getSteps() {
        return steps;
    }

    public void setSteps(List<StepDto> steps) {
        this.steps = steps;
    }
}
