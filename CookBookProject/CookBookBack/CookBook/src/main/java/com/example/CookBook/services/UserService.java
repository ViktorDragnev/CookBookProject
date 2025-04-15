package com.example.CookBook.services;

import com.example.CookBook.dtos.responses.UserDto;
import com.example.CookBook.dtos.responses.UserProfileDto;

public interface UserService {

    UserDto getUserByUsername(String username);

    UserProfileDto getUserProfile(String username);
}
