package com.example.CookBook.services.implementation;

import com.example.CookBook.dtos.responses.SimpleDishDto;
import com.example.CookBook.dtos.responses.UserProfileDto;
import com.example.CookBook.dtos.responses.UserDto;
import com.example.CookBook.entities.Dish;
import com.example.CookBook.entities.UserEntity;
import com.example.CookBook.mapper.DishMapper;
import com.example.CookBook.mapper.UserMapper;
import com.example.CookBook.repositories.UserRepository;
import com.example.CookBook.services.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto getUserByUsername(String username) {
        Optional<UserEntity> user = userRepository.findByUsername(username);

        return user.map(UserMapper::mapToDto).orElse(null);
    }

    @Override
    public UserProfileDto getUserProfile(String username) {
        UserEntity user = userRepository.findByUsername(username).get();

        List<Dish> dishes = user.getDishes();

        List<SimpleDishDto> simpleDishes = new ArrayList<>();

        for(Dish dish : dishes) {
            SimpleDishDto simpleDishDto = new SimpleDishDto(
                    dish.getName(),
                    dish.getDishType(),
                    dish.getDescription(),
                    dish.getPrepTime(),
                    dish.getImageName(),
                    dish.getImageType(),
                    dish.getImage(),
                    DishMapper.toListIngredientDto(dish.getIngredientList()),
                    DishMapper.toListStepDto(dish.getSteps())
            );
            simpleDishes.add(simpleDishDto);
        }

        return new UserProfileDto(user.getUsername(), simpleDishes);
    }

    @Override
    public void updateUsername(String username, String newUsername) {
        UserEntity user = userRepository.findByUsername(username).get();
        user.setUsername(newUsername);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(String username) {
        UserEntity user = userRepository.findByUsername(username).get();
        userRepository.delete(user);
    }
}
