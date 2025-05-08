package com.example.CookBook.services.implementation;

import com.example.CookBook.dtos.requests.RatingRequestDto;
import com.example.CookBook.entities.Rating;
import com.example.CookBook.entities.UserEntity;
import com.example.CookBook.repositories.RatingRepository;
import com.example.CookBook.repositories.UserRepository;
import com.example.CookBook.services.RatingService;
import org.springframework.stereotype.Service;

@Service
public class RatingServiceImpl implements RatingService {

    private RatingRepository ratingRepository;
    private UserRepository userRepository;

    public RatingServiceImpl(RatingRepository ratingRepository, UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void addRating(String username, RatingRequestDto ratingRequestDto) throws IllegalArgumentException {
        UserEntity user = userRepository.findByUsername(username).get();
        if(user.getRating() == null) {
            Rating rating = new Rating(ratingRequestDto.getValue(), ratingRequestDto.getComment());
            rating.setUser(user);
            ratingRepository.save(rating);
            user.setRating(rating);
            userRepository.save(user);
        }else
            throw new IllegalArgumentException();
    }
}
