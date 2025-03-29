package com.example.CookBook.controller;

import com.example.CookBook.dtos.UserDto;
import com.example.CookBook.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public UserDto getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }
}
