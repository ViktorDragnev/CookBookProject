package com.example.CookBook.services.implementation;

import com.example.CookBook.dtos.requests.DishDto;
import com.example.CookBook.entities.Dish;
import com.example.CookBook.entities.Ingredient;
import com.example.CookBook.entities.UserEntity;
import com.example.CookBook.enums.DishType;
import com.example.CookBook.mapper.DishMapper;
import com.example.CookBook.mapper.UserMapper;
import com.example.CookBook.repositories.DishRepository;
import com.example.CookBook.repositories.UserRepository;
import com.example.CookBook.services.DishService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DishServiceImpl implements DishService {

    private final DishRepository dishRepository;
    private final UserRepository userRepository;

    public DishServiceImpl(DishRepository dishRepository, UserRepository userRepository) {
        this.dishRepository = dishRepository;
        this.userRepository = userRepository;
    }

    @Override
    public DishDto addDish(DishDto dishDto, String username) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(username);

        Dish dish = DishMapper.toEntity(dishDto);

        dish.setUser(userEntity.orElse(null));
        dish.setIngredientList(DishMapper.toListIngredientEntity(dishDto.getIngredientList()));
        dish.setSteps(DishMapper.toListStepEntity(dishDto.getSteps()));
        dishDto.setUser(UserMapper.mapToDto(userEntity.get()));
        dishRepository.save(dish);
        return dishDto;
    }

    @Override
    public DishDto addImageToDish(String name, MultipartFile file) {
        Optional<Dish> dish = dishRepository.findByName(name);
        Dish realDish = null;

        if (dish.isPresent()) {
            realDish = dish.get();
        }

        try {
            realDish.setImageName(file.getOriginalFilename());
            realDish.setImageType(file.getContentType());
            realDish.setImage(file.getBytes());
            dishRepository.save(realDish);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return DishMapper.toDto(realDish);
    }

    @Override
    public void deleteDish(String dishName, String username) {
        Optional<Dish> dish = dishRepository.findByName(dishName);

        if(dish.isPresent()) {
            Dish realDish = dish.get();
            if(!realDish.getUser().getUsername().equals(username)) {
                throw new IllegalArgumentException("You are not the owner of this recipe.");
            }
            dishRepository.delete(realDish);
            DishMapper.toDto(dish.get());
        } else {
            throw new IllegalArgumentException("Recipe not found.");
        }
    }

    @Override
    public DishDto deleteDishTest(String dishName) {
        Dish dish = dishRepository.findByName(dishName).get();
        dishRepository.delete(dish);
        return DishMapper.toDto(dish);
    }


    @Override
    public List<DishDto> getDishes() {
        List<Dish> dishes = dishRepository.findAll();
        if(dishes.isEmpty()){
            throw new NullPointerException();
        }
        return DishMapper.toListDishDto(dishes);
    }

    @Override
    public DishDto getDishByName(String name) {
        Dish dish = dishRepository.findByName(name).get();
        return DishMapper.toCompleteDto(dish);
    }

    @Override
    public List<DishDto> displayDishesByType(DishType dishType) {
        List<Dish> dishes = dishRepository.findAllByDishType(dishType);
        return DishMapper.toListDishDto(dishes);
    }

    @Override
    public boolean dishNameExists(String name) {
        return dishRepository.existsByName(name);
    }

    @Override
    public List<DishDto> findDishesContainingMatchingIngredient(List<String> ingredients) {
        List<Dish> dishes = dishRepository.findAll();
        List<DishDto> dishDtos = new ArrayList<>();

        for (Dish dish : dishes) {
            List<String> dishIngredientNames = dish.getIngredientList().stream()
                    .map(Ingredient::getName)
                    .toList();

            if (ingredients.containsAll(dishIngredientNames)) {
                dishDtos.add(DishMapper.toDto(dish));
            }
        }

        return dishDtos;
    }

    @Override
    public List<DishDto> findDishesByName(String name) {
        List<Dish> dishes = dishRepository.findByNameContainingIgnoreCase(name);

        if (dishes.isEmpty()) {
            throw new IllegalArgumentException("No dishes found with name containing: " + name);
        }

        return DishMapper.toListDishDto(dishes);
    }

    @Override
    public void updateDish(String dishName, DishDto dishDto, String username) {
        Dish dish = dishRepository.findByName(dishName).get();

        boolean isUpdated = false;

        if(!dish.getUser().getUsername().equals(username)) {
            throw new IllegalArgumentException("You are not the owner of this recipe.");
        }

        if (dishDto.getName() != null && !dishDto.getName().isBlank()) {
            dish.setName(dishDto.getName());
            isUpdated = true;
        }

        if (dishDto.getDishType() != null) {
            dish.setDishType(dishDto.getDishType());
            isUpdated = true;
        }

        if (dishDto.getDescription() != null && !dishDto.getDescription().isBlank()) {
            dish.setDescription(dishDto.getDescription());
            isUpdated = true;
        }

        if (dishDto.getPrepTime() != null) {
            dish.setPrepTime(dishDto.getPrepTime());
            isUpdated = true;
        }

        if (dishDto.getIngredientList() != null && !dishDto.getIngredientList().isEmpty()) {
            dish.setIngredientList(DishMapper.toListIngredientEntity(dishDto.getIngredientList()));
            isUpdated = true;
        }

        if (dishDto.getSteps() != null && !dishDto.getSteps().isEmpty()) {
            dish.setSteps(DishMapper.toListStepEntity(dishDto.getSteps()));
            isUpdated = true;
        }

        if (isUpdated) {
            dishRepository.save(dish);
        }
    }

    @Override
    public void updateDishImage(String dishName, MultipartFile file, String username) throws IOException {
        Dish dish = dishRepository.findByName(dishName).get();

        if(!dish.getUser().getUsername().equals(username)) {
            throw new IllegalArgumentException("You are not the owner of this recipe.");
        }

        if(!file.isEmpty() || file.getSize() != 0) {
            dish.setImage(file.getBytes());
            dish.setImageName(file.getOriginalFilename());
            dish.setImageType(file.getContentType());
            dishRepository.save(dish);
        }
    }
}
