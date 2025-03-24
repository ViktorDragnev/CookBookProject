package com.example.CookBook.services.implementation;

import com.example.CookBook.repositories.IngredientRepository;
import com.example.CookBook.services.IngredientService;
import org.springframework.stereotype.Service;

@Service
public class IngredientServiceImpl implements IngredientService {

    private IngredientRepository ingredientRepository;

    public IngredientServiceImpl(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }
}
