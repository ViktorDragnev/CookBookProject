package com.example.CookBook.controller;

import com.example.CookBook.dtos.responses.UserDto;
import com.example.CookBook.dtos.responses.UserProfileDto;
import com.example.CookBook.security.JWTGenerator;
import com.example.CookBook.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@RestController
@RequestMapping(path = "api/user")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    @Value("${jwt.secret}")
    private String jwtSigningKey;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
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

    @PutMapping(path = "/updateUsername")
    public ResponseEntity<String> updateUsername(@RequestHeader("Authorization") String token, String newUsername){
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = JWTGenerator.getUsernameFromJWT(jwt);

        userService.updateUsername(username, newUsername);
        return new ResponseEntity<>("Username updated successfully!", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUser(@RequestHeader("Authorization") String token){
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = JWTGenerator.getUsernameFromJWT(jwt);

        userService.deleteUser(username);
        return new ResponseEntity<>("Account deleted successfully!",HttpStatus.OK);
    }
}
