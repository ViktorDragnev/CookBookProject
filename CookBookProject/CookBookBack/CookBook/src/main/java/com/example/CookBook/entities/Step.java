package com.example.CookBook.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "steps")
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String step;

    @ManyToOne
    @JoinColumn(name = "dish_id")
    private Dish dish;

    public Step() {}

    public Step(String step) {
        this.step = step;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStep() {
        return step;
    }

    public void setStep(String step) {
        this.step = step;
    }

    public Dish getDish() {
        return dish;
    }

    public void setDish(Dish dish) {
        this.dish = dish;
    }
}
