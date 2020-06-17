package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.*;
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
    public ActorPageSimpleForm getAllActors(@RequestParam(defaultValue = "0") Integer page,
                                            @RequestParam(defaultValue = "10") Integer size,
                                            @RequestParam(defaultValue = "name") String sortBy) {

        return actorService.findAll(page, size, sortBy);
    }

    @GetMapping("/{id}")
    public ActorForm getActor(@PathVariable String id) {
        return actorService.findById(id);
    }

    @RequestMapping(value = "/filter", params = "name", method = RequestMethod.GET)
    public ActorPageSimpleForm findAllByName(@RequestParam(defaultValue = "0") Integer page,
                                         @RequestParam(defaultValue = "10") Integer size,
                                         @RequestParam(defaultValue = "name") String sortBy,
                                         @RequestParam String name) {
        return actorService.findAllByName(page, size, sortBy, name);
    }

    @PostMapping
    public ActorForm create(@RequestBody ActorForm actorForm) {
        return actorService.saveAndReturn(actorForm);
    }

    @PutMapping("/{id}")
    public ActorForm update(@RequestBody ActorForm actorForm) {
        return actorService.saveAndReturn(actorForm);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        actorService.delete(id);
    }
}
