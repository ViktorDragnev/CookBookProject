package com.example.CookBook.services.implementation;

import com.example.CookBook.dtos.UserDto;
import com.example.CookBook.entities.User;
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
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToEntity(userDto);
        userRepository.save(user);
        return userDto;
    }

    @Override
    public UserDto getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        return user.map(UserMapper::mapToDto).orElse(null);
    }
}
