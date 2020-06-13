package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.ActorForm;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import com.project.movie_catalog.service.ActorService;
import com.project.movie_catalog.service.ActorServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/actors")
@CrossOrigin(origins = "http://localhost:3000")
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorServiceImpl actorService) {
        this.actorService = actorService;
    }

    @GetMapping("")
    public List<ActorForm> getAllActors(@RequestParam(defaultValue = "0") Integer page,
                                       @RequestParam(defaultValue = "10") Integer size,
                                       @RequestParam(defaultValue = "title") String sortBy) {

        return actorService.findAll(page, size, sortBy);
    }
}
