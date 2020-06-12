package com.project.movie_catalog.service;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FilmService extends BasicService<FilmForm, String> {

    FilmPageSimpleForm findAll(Integer page, Integer size, String sortBy, boolean desc);

    FilmPageSimpleForm findAllByTitle(Integer page, Integer size, String sortBy, String title, boolean desc);

    FilmPageSimpleForm findAllByTitleOrg(Integer page, Integer size, String sortBy, String titleOrg, boolean desc);

    FilmPageSimpleForm findAllByRate(Integer page, Integer size, String sortBy, String rate, boolean greater, boolean desc);

    FilmPageSimpleForm findAllByVotes(Integer page, Integer size, String sortBy, String votes, boolean greater, boolean desc);

    FilmPageSimpleForm findAllByGenres(Integer page, Integer size, String sortBy, List<String> genres, boolean desc);

    FilmPageSimpleForm findAllByYear(Integer page, Integer size, String sortBy, String year, boolean greater, boolean desc);

    FilmPageSimpleForm findAllByYearBetween(Integer page, Integer size, String sortBy, String yearFirst, String yearSecond, boolean desc);

    FilmPageSimpleForm findAllByDuration(Integer page, Integer size, String sortBy, String duration, boolean greater, boolean desc);

    long count();
}
