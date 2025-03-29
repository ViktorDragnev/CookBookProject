package com.example.CookBook.dtos;

import com.example.CookBook.enums.DishType;

import java.util.ArrayList;
import java.util.List;

public class DishDto {
    String name;
    DishType dishType;
    String description;
    String prepTime;
    String imageName;
    String imageType;
    byte[] image;
    List<IngredientDto> ingredientList = new ArrayList<>();
    List<StepDto> steps = new ArrayList<>();

    public DishDto() {
    }

    public DishDto(String name,DishType dishType, String description, String prepTime) {
        this.name = name;
        this.dishType = dishType;
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

    public DishType getDishType() {
        return dishType;
    }

    public void setDishType(DishType dishType) {
        this.dishType = dishType;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }
}
