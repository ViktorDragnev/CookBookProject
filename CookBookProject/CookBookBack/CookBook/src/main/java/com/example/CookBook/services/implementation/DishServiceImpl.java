package com.example.CookBook.services.implementation;

import com.example.CookBook.dtos.requests.DishDto;
import com.example.CookBook.dtos.responses.IngredientDto;
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
    public DishDto addDishNoAuth(DishDto dishDto) {
        if(dishRepository.existsByName(dishDto.getName())) {
            throw new IllegalArgumentException("Dish name already exists");
        }
        Optional<UserEntity> entity = userRepository.findByUsername("test1");
        Dish dish = DishMapper.toEntity(dishDto);

        dish.setUser(entity.get());
        dish.setIngredientList(DishMapper.toListIngredientEntity(dishDto.getIngredientList()));
        dish.setSteps(DishMapper.toListStepEntity(dishDto.getSteps()));
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
    public DishDto deleteDish(Long dishId, String username) {
        Optional<Dish> dish = dishRepository.findById(dishId);

        if(dish.isPresent()) {
            Dish realDish = dish.get();
            if(!realDish.getUser().getUsername().equals(username)) {
                throw new IllegalArgumentException("You are not the owner of this recipe.");
            }
            DishDto dishDto = DishMapper.toDto(dish.get());
            dishRepository.delete(realDish);
            return dishDto;
        } else {
            throw new IllegalArgumentException("Recipe not found.");
        }
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
        Optional<Dish> dish = dishRepository.findByName(name);
        DishDto dishDto = DishMapper.toDto(dish.get());
        dishDto.setUser(UserMapper.mapToDto(dish.get().getUser()));
        dishDto.setImageName(dish.get().getImageName());
        dishDto.setImageType(dish.get().getImageType());
        dishDto.setImage(dish.get().getImage());
        dishDto.setIngredientList(DishMapper.toListIngredientDto(dish.get().getIngredientList()));
        dishDto.setSteps(DishMapper.toListStepDto(dish.get().getSteps()));
        return dishDto;
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
    public List<DishDto> findDishesContainingAnyIngredient(List<String> ingredients) {
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

}
