package com.example.CookBook.mapper;

import com.example.CookBook.dtos.UserDto;
import com.example.CookBook.entities.User;

public class UserMapper {

    public static User mapToEntity(UserDto userDto) {
        return new User(userDto.getUsername(), userDto.getPassword(), userDto.getEmail());
    }

    public static UserDto mapToDto(User user) {
        return new UserDto(user.getUsername(), user.getPassword(), user.getEmail());
    }
}
