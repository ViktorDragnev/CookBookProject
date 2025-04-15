package com.example.CookBook.dtos.responses;

import com.example.CookBook.dtos.requests.DishDto;

import java.util.List;

public class UserProfileDto {
    String username;
    List<SimpleDishDto> dishes;

    public UserProfileDto(String username, List<SimpleDishDto> dishes) {
        this.username = username;
        this.dishes = dishes;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<SimpleDishDto> getDishes() {
        return dishes;
    }

    public void setDishes(List<SimpleDishDto> dishes) {
        this.dishes = dishes;
    }
}
