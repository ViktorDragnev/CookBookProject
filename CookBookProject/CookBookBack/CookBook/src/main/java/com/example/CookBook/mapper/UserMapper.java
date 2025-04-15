package com.example.CookBook.mapper;

import com.example.CookBook.dtos.responses.UserDto;
import com.example.CookBook.entities.UserEntity;

public class UserMapper {

    public static UserDto mapToDto(UserEntity userEntity) {
        return new UserDto(userEntity.getUsername());
    }
}
