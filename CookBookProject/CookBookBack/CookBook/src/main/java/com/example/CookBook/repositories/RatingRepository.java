package com.example.CookBook.repositories;

import com.example.CookBook.entities.Rating;
import com.example.CookBook.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findByUser(UserEntity user);
}
