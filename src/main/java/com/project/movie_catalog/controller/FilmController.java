package com.project.movie_catalog.controller;

import com.project.movie_catalog.model.Cos;
import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.service.CosService;
import com.project.movie_catalog.service.CosServiceImpl;
import com.project.movie_catalog.service.FilmService;
import com.project.movie_catalog.service.FilmServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/films1")
public class FilmController {

    private final FilmService filmService;
    private final CosService cosService;

    public FilmController(FilmServiceImpl filmService, CosServiceImpl cosService) {
        this.filmService = filmService;
        this.cosService = cosService;
    }

    @GetMapping("/all")
    public List<Film> getAllFilms(){
        System.out.println("jestem");
        return filmService.findAll();
    }

    @GetMapping("/cos")
    public List<Cos> getAllCos(){
        System.out.println("jestem cos");
        return cosService.findAll();
    }
}
