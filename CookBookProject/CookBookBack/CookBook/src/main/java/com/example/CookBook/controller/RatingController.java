package com.example.CookBook.controller;

import com.example.CookBook.dtos.requests.RatingRequestDto;
import com.example.CookBook.security.JWTGenerator;
import com.example.CookBook.services.RatingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/ratings")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping(path = "/add")
    public ResponseEntity<String> addRating(@RequestHeader("Authorization") String token,
                                    @RequestBody RatingRequestDto ratingRequestDto) {
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String username = JWTGenerator.getUsernameFromJWT(jwt);

        ratingService.addRating(username, ratingRequestDto);
        return new ResponseEntity<>("Rating added successfully!", HttpStatus.CREATED);
    }
}
