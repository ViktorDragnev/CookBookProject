package com.example.CookBook.utils;

import com.example.CookBook.entities.Role;
import com.example.CookBook.repositories.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class RoleFactory {

    private final RoleRepository roleRepository;

    public RoleFactory(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void initRoles() {
        if (roleRepository.findByName("USER").isEmpty()) {
            Role userRole = new Role();
            userRole.setName("USER");
            roleRepository.save(userRole);
        }
    }
}