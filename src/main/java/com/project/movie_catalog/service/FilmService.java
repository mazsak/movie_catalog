package com.project.movie_catalog.service;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FilmService extends BasicService<FilmForm, String> {

    FilmPageSimpleForm findAll(Integer page, Integer size, String sortBy);

    FilmPageSimpleForm findAllByTitle(Integer page, Integer size, String sortBy, String title);

    FilmPageSimpleForm findAllByTitleOrg(Integer page, Integer size, String sortBy, String titleOrg);

    FilmPageSimpleForm findAllByRate(Integer page, Integer size, String sortBy, String rate, boolean greater);

    FilmPageSimpleForm findAllByVotes(Integer page, Integer size, String sortBy, String votes, boolean greater);

    FilmPageSimpleForm findAllByGenres(Integer page, Integer size, String sortBy, List<String> genres);

    FilmPageSimpleForm findAllByYear(Integer page, Integer size, String sortBy, String year, boolean greater);

    FilmPageSimpleForm findAllByYearBetween(Integer page, Integer size, String sortBy, String yearFirst, String yearSecond);

    FilmPageSimpleForm findAllByDuration(Integer page, Integer size, String sortBy, String duration, boolean greater);

    long count();
}
