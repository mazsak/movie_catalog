package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.FilmSimpleForm;
import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.service.FilmService;
import com.project.movie_catalog.service.FilmServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/films")
public class FilmController {

    private final FilmService filmService;

    public FilmController(FilmServiceImpl filmService) {
        this.filmService = filmService;
    }

    @GetMapping("")
    public List<FilmSimpleForm> getAllFilms(@RequestParam(defaultValue = "0") Integer page,
                                            @RequestParam(defaultValue = "10") Integer size,
                                            @RequestParam(defaultValue = "title") String sortBy){

        return filmService.findAll(page, size, sortBy);
    }
}
