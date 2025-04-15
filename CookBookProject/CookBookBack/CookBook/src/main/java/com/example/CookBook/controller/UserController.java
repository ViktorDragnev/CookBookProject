package com.example.CookBook.controller;

import com.example.CookBook.dtos.responses.UserDto;
import com.example.CookBook.dtos.responses.UserProfileDto;
import com.example.CookBook.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public UserDto getUserByUsername(@RequestParam String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping(path = "/{username}")
    public ResponseEntity<UserProfileDto> getUserById(@PathVariable String username) {
        UserProfileDto userProfileDto = userService.getUserProfile(username);
        return new ResponseEntity<>(userProfileDto, HttpStatus.OK);
    }
}
