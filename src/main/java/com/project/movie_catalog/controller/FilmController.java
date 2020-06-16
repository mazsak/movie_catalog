package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmFormWithComments;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import com.project.movie_catalog.service.CommentService;
import com.project.movie_catalog.service.FilmService;
import com.project.movie_catalog.service.FilmServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/films")
@CrossOrigin(origins = "http://localhost:3000")
public class FilmController {

    private final FilmService filmService;
    private final CommentService commentService;

    public FilmController(FilmServiceImpl filmService, CommentService commentService) {
        this.filmService = filmService;
        this.commentService = commentService;
    }

    @GetMapping("")
    public FilmPageSimpleForm getAllFilms(@RequestParam(defaultValue = "0") Integer page,
                                          @RequestParam(defaultValue = "10") Integer size,
                                          @RequestParam(defaultValue = "title") String sortBy,
                                          @RequestParam(defaultValue = "true") boolean desc) {

        return filmService.findAll(page, size, sortBy, desc);
    }

    @GetMapping("/{id}")
    public FilmFormWithComments getFilm(@PathVariable String id) {
        FilmFormWithComments filmFormWithComments = new FilmFormWithComments();
        filmFormWithComments.setFilm(filmService.findById(id));
        filmFormWithComments.setComments(commentService.findAllByIdFilm(filmFormWithComments.getFilm().getId()));
        return filmFormWithComments;
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

    @PostMapping
    public FilmForm create(@RequestBody FilmForm filmForm) {
        return filmService.saveAndReturn(filmForm);
    }

    @PutMapping("/{id}")
    public FilmForm update(@RequestBody FilmForm filmForm) {
        return filmService.saveAndReturn(filmForm);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        filmService.delete(id);
    }
}
