package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmSimpleForm;
import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.search.FilmSearchParams;
import com.project.movie_catalog.service.FilmService;
import com.project.movie_catalog.service.FilmServiceImpl;
import com.sipios.springsearch.anotation.SearchSpec;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public FilmForm getFilm(@PathVariable String id){
        return filmService.findById(id);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<FilmSimpleForm>> searchForFilms(@SearchSpec Specification<Film> specification){
//        return filmService.searchForFilms(specification);
        return null;
    }

    @PostMapping
    public FilmForm create(@RequestBody FilmForm filmForm){
        return filmService.saveAndReturn(filmForm);
    }

    @PutMapping("/{id}")
    public FilmForm update(@RequestBody FilmForm filmForm){
        return filmService.saveAndReturn(filmForm);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        filmService.delete(id);
    }

    @GetMapping("/count")
    public long count(){
        return filmService.count();
    }
}
