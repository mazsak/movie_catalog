package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.UserForm;
import com.project.movie_catalog.service.UserService;
import com.project.movie_catalog.service.UserServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public List<UserForm> getAllFilms(@RequestParam(defaultValue = "0") Integer page,
                                      @RequestParam(defaultValue = "10") Integer size,
                                      @RequestParam(defaultValue = "title") String sortBy) {

        return userService.findAll(page, size, sortBy);
    }
}
