package com.example.CookBook.entities;

import com.example.CookBook.enums.DishType;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dishes")
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinTable(
            name = "user_dishes",
            joinColumns = @JoinColumn(name = "dish_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private UserEntity user;
    private String name;
    private DishType dishType;
    private String description;
    private String prepTime;
    private String imageName;
    private String imageType;
    @Lob
    private byte[] image;

    @ManyToMany(fetch = FetchType.EAGER,
    cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "ingredients_for_each_dish",
            joinColumns = @JoinColumn(name = "dish_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> ingredients = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER,
    cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "steps_for_each_dish",
            joinColumns = @JoinColumn(name = "dish_id"),
            inverseJoinColumns = @JoinColumn(name = "step_id")
    )
    private List<Step> steps = new ArrayList<>();

    public Dish() {}

    public Dish(String name, DishType dishType, String description, String prepTime) {
        this.name = name;
        this.dishType = dishType;
        this.description = description;
        this.prepTime = prepTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public List<Ingredient> getIngredientList() {
        return ingredients;
    }

    public void setIngredientList(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(String prepTime) {
        this.prepTime = prepTime;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

    public DishType getDishType() {
        return dishType;
    }

    public void setDishType(DishType dishType) {
        this.dishType = dishType;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
