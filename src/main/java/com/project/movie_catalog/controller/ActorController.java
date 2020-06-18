package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.ActorForm;
import com.project.movie_catalog.form.ActorPageSimpleForm;
import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.service.ActorService;
import com.project.movie_catalog.service.ActorServiceImpl;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/top")
    public List<ActorForm> getAll() {
        return actorService.findAllTop();
    }

    @GetMapping("/{id}")
    public ActorForm getActor(@PathVariable String id) {
        return actorService.findById(id);
    }

    @RequestMapping(value = "/filter", params = "name", method = RequestMethod.GET)
    public ActorPageSimpleForm findAllByName(@RequestParam(defaultValue = "0") Integer page,
                                             @RequestParam(defaultValue = "10") Integer size,
                                             @RequestParam(defaultValue = "name") String sortBy,
                                             @RequestParam String name,
                                             @RequestParam(defaultValue = "true") boolean desc) {
        return actorService.findAllByName(page, size, sortBy, name, desc);
    }

    @RequestMapping(value = "/filter", params = {"rateFirst", "rateSecond"}, method = RequestMethod.GET)
    public ActorPageSimpleForm findFilmsByRateBetween(@RequestParam(defaultValue = "0") Integer page,
                                                      @RequestParam(defaultValue = "10") Integer size,
                                                      @RequestParam(defaultValue = "name") String sortBy,
                                                      @RequestParam String rateFirst,
                                                      @RequestParam String rateSecond,
                                                      @RequestParam(defaultValue = "true") boolean desc

    ) {
        return actorService.findAllByRateBetween(page, size, sortBy, rateFirst, rateSecond, desc);
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
