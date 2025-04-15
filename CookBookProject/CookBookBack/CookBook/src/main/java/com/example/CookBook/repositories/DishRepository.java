package com.example.CookBook.repositories;

import com.example.CookBook.dtos.requests.DishDto;
import com.example.CookBook.entities.Dish;
import com.example.CookBook.entities.Ingredient;
import com.example.CookBook.enums.DishType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {

    Optional<Dish> findByName(String name);

    boolean existsByName(String name);

    List<Dish> findAllByDishType(DishType dishType);

}
