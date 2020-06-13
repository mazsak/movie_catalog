package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import com.project.movie_catalog.search.FilmSearchParams;
import com.project.movie_catalog.service.FilmService;
import com.project.movie_catalog.service.FilmServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/films")
@CrossOrigin(origins = "http://localhost:3000")
public class FilmController {

    private final FilmService filmService;

    public FilmController(FilmServiceImpl filmService) {
        this.filmService = filmService;
    }

    @GetMapping("")
    public FilmPageSimpleForm getAllFilms(@RequestParam(defaultValue = "0") Integer page,
                                          @RequestParam(defaultValue = "10") Integer size,
                                          @RequestParam(defaultValue = "title") String sortBy,
                                          @RequestParam(defaultValue = "true") boolean desc) {

        return filmService.findAll(page, size, sortBy, desc);
    }

    @GetMapping("/{id}")
    public FilmForm getFilm(@PathVariable String id) {
        return filmService.findById(id);
    }

    @RequestMapping(value = "/filter", params = "title", method = RequestMethod.GET)
    public FilmPageSimpleForm findAllByTitle(@RequestParam(defaultValue = "0") Integer page,
                                             @RequestParam(defaultValue = "10") Integer size,
                                             @RequestParam(defaultValue = "title") String sortBy,
                                             @RequestParam String title,
                                             @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByTitle(page, size, sortBy, title, desc);
    }

    @RequestMapping(value = "/filter", params = "titleOrg")
    public FilmPageSimpleForm findFilmsByTitleOrg(@RequestParam(defaultValue = "0") Integer page,
                                                  @RequestParam(defaultValue = "10") Integer size,
                                                  @RequestParam(defaultValue = "title") String sortBy,
                                                  @RequestParam String titleOrg,
                                                  @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByTitleOrg(page, size, sortBy, titleOrg, desc);
    }

    @RequestMapping(value = "/filter", params = {"rate", "greater"})
    public FilmPageSimpleForm findFilmsByRate(@RequestParam(defaultValue = "0") Integer page,
                                              @RequestParam(defaultValue = "10") Integer size,
                                              @RequestParam(defaultValue = "title") String sortBy,
                                              @RequestParam String rate,
                                              @RequestParam(defaultValue = "true") boolean greater,
                                              @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByRate(page, size, sortBy, rate, greater, desc);
    }

    @RequestMapping(value = "/filter", params = {"votes", "greater"})
    public FilmPageSimpleForm findFilmsByVotes(@RequestParam(defaultValue = "0") Integer page,
                                               @RequestParam(defaultValue = "10") Integer size,
                                               @RequestParam(defaultValue = "title") String sortBy,
                                               @RequestParam String votes,
                                               @RequestParam(defaultValue = "true") boolean greater,
                                               @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByVotes(page, size, sortBy, votes, greater, desc);
    }

    @RequestMapping(value = "/filter", params = "genres")
    public FilmPageSimpleForm findFilmsByGenres(@RequestParam(defaultValue = "0") Integer page,
                                                @RequestParam(defaultValue = "10") Integer size,
                                                @RequestParam(defaultValue = "title") String sortBy,
                                                @RequestParam List<String> genres,
                                                @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByGenres(page, size, sortBy, genres, desc);
    }

    @RequestMapping(value = "/filter", params = {"yearGreater", "greater"})
    public FilmPageSimpleForm findFilmsByYear(@RequestParam(defaultValue = "0") Integer page,
                                              @RequestParam(defaultValue = "10") Integer size,
                                              @RequestParam(defaultValue = "title") String sortBy,
                                              @RequestParam String yearGreater,
                                              @RequestParam(defaultValue = "true") boolean greater,
                                              @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByYear(page, size, sortBy, yearGreater, greater, desc);
    }

    @RequestMapping(value = "/filter", params = {"duration", "greater"})
    public FilmPageSimpleForm findFilmsByDuration(@RequestParam(defaultValue = "0") Integer page,
                                                  @RequestParam(defaultValue = "10") Integer size,
                                                  @RequestParam(defaultValue = "title") String sortBy,
                                                  @RequestParam String duration,
                                                  @RequestParam(defaultValue = "true") boolean greater,
                                                  @RequestParam(defaultValue = "true") boolean desc) {
        return filmService.findAllByDuration(page, size, sortBy, duration, greater, desc);
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

    @GetMapping("/count")
    public long count() {
        return filmService.count();
    }
}
