package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmSimpleForm;
import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.model.SearchParam;
import com.project.movie_catalog.service.FilmService;
import com.project.movie_catalog.service.FilmServiceImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @PostMapping("/find_film")
    public List<FilmSimpleForm> findMessage(@RequestBody SearchParam searchParam){
        return null; //FIXME create method in service and repo
    }

    @PostMapping
    public FilmForm create(@RequestBody FilmForm filmForm){
        return filmService.saveAndReturn(filmForm);
    }

    @PutMapping("/{id}")
    public FilmForm update(@RequestBody FilmForm filmForm){
        return filmService.saveAndReturn(filmForm);//FIXME pleas
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        filmService.delete(id);
    }

}
