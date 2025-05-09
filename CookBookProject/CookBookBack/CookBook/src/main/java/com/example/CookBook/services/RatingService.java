package com.example.CookBook.services;

import com.example.CookBook.dtos.requests.RatingRequestDto;

public interface RatingService {
    void addRating(String username, RatingRequestDto ratingRequestDto);

    boolean existsRating(String username);
}
