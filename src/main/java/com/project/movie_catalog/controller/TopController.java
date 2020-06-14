package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import com.project.movie_catalog.service.FilmService;
import com.project.movie_catalog.service.FilmServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/top")
@CrossOrigin(origins = "http://localhost:3000")
public class TopController {

    private final FilmService filmService;

    public TopController(FilmServiceImpl filmService) {
        this.filmService = filmService;
    }

    @GetMapping("")
    public FilmPageSimpleForm getAllFilms(@RequestParam(defaultValue = "0") Integer page,
                                          @RequestParam(defaultValue = "10") Integer size,
                                          @RequestParam(defaultValue = "title") String sortBy,
                                          @RequestParam(defaultValue = "true") boolean desc) {

        return filmService.findAll(page, size, sortBy, desc);
    }

    @RequestMapping(value = "/filter", params = "title", method = RequestMethod.GET)
    public FilmPageSimpleForm findAllByTitle(@RequestParam(defaultValue = "0") Integer page,
                                             @RequestParam(defaultValue = "10") Integer size,
                                             @RequestParam(defaultValue = "title") String sortBy,
                                             @RequestParam String title,
                                             @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByTitle(page, size, sortBy, title, desc);
    }

    @RequestMapping(value = "/filter", params = "genres")
    public FilmPageSimpleForm findFilmsByGenres(@RequestParam(defaultValue = "0") Integer page,
                                                @RequestParam(defaultValue = "10") Integer size,
                                                @RequestParam(defaultValue = "title") String sortBy,
                                                @RequestParam List<String> genres,
                                                @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByGenres(page, size, sortBy, genres, desc);
    }

    @RequestMapping(value = "/filter", params = {"yearFirst", "yearSecond"})
    public FilmPageSimpleForm findFilmsByYearBetween(@RequestParam(defaultValue = "0") Integer page,
                                                     @RequestParam(defaultValue = "10") Integer size,
                                                     @RequestParam(defaultValue = "title") String sortBy,
                                                     @RequestParam String yearFirst,
                                                     @RequestParam String yearSecond,
                                                     @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByYearBetween(page, size, sortBy, yearFirst, yearSecond, desc);
    }

    @RequestMapping(value = "/filter", params = {"rateFirst", "rateSecond"})
    public FilmPageSimpleForm findFilmsByRateBetween(@RequestParam(defaultValue = "0") Integer page,
                                                     @RequestParam(defaultValue = "10") Integer size,
                                                     @RequestParam(defaultValue = "title") String sortBy,
                                                     @RequestParam String rateFirst,
                                                     @RequestParam String rateSecond,
                                                     @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByRateBetween(page, size, sortBy, rateFirst, rateSecond, desc);
    }
}
