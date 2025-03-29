package com.example.CookBook.services;

import com.example.CookBook.dtos.UserDto;
import com.example.CookBook.entities.User;

public interface UserService {

    UserDto createUser(UserDto user);

    UserDto getUserByEmail(String email);
}
