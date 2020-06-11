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
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/filter/title")
    public List<FilmSimpleForm> findAllByTitle(@RequestParam String title){
        return filmService.findAllByTitle(title);
    }

    @GetMapping("/filter/titleOrg")
    public List<FilmSimpleForm> findFilmsByTitleOrg(@RequestParam String titleOrg){
        return filmService.findAllByTitleOrg(titleOrg);
    }

    @GetMapping("/filter/rate")
    public List<FilmSimpleForm> findFilmsByRate(@RequestParam String rate, boolean greater){
        return filmService.findAllByRate(rate, greater);
    }

    @GetMapping("/filter/votes")
    public List<FilmSimpleForm> findFilmsByVotes(@RequestParam String votes, boolean greater){
        return filmService.findAllByVotes(votes, greater);
    }

    @GetMapping("/filter/genres")
    public List<FilmSimpleForm> findFilmsByGenres(@RequestParam List<String> genres){
        return filmService.findAllByGenres(genres);
    }

    @GetMapping("/filter/year")
    public List<FilmSimpleForm> findFilmsByYear(@RequestParam String year, boolean greater){
        return filmService.findAllByYear(year, greater);
    }

    @GetMapping("/filter/duration")
    public List<FilmSimpleForm> findFilmsByDuration(@RequestParam String duration, boolean greater){
        return filmService.findAllByDuration(duration, greater);
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
