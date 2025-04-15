package com.example.CookBook.services.implementation;

import com.example.CookBook.dtos.responses.UserProfileDto;
import com.example.CookBook.dtos.responses.UserDto;
import com.example.CookBook.entities.UserEntity;
import com.example.CookBook.mapper.DishMapper;
import com.example.CookBook.mapper.UserMapper;
import com.example.CookBook.repositories.UserRepository;
import com.example.CookBook.services.UserService;
import org.springframework.stereotype.Service;

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
        Optional<UserEntity> user = userRepository.findByUsername(username);

        return user.map(userEntity -> new UserProfileDto(
                userEntity.getUsername(),
                DishMapper.toListSimpleDishEntity(userEntity.getDishes()))).orElse(null);
    }
}
