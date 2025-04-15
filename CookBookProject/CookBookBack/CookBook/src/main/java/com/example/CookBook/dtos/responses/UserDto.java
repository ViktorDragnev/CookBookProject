package com.example.CookBook.dtos.responses;

public class UserDto {
    String username;

    public UserDto(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
