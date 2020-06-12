package com.project.movie_catalog.service;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmSimpleForm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FilmService extends BasicService<FilmForm, String> {

    List<FilmSimpleForm> findAll(Integer page, Integer size, String sortBy);
    List<FilmSimpleForm> findAllByTitle(String title);
    List<FilmSimpleForm> findAllByTitleOrg(String title_org);
    List<FilmSimpleForm> findAllByRate(String rate, boolean greater);
    List<FilmSimpleForm> findAllByVotes(String votes, boolean greater);
    List<FilmSimpleForm> findAllByGenres(List<String> genres);
    List<FilmSimpleForm> findAllByYear(String year, boolean greater);
    List<FilmSimpleForm> findAllByYearBetween(String yearFirst, String yearSecond);
    List<FilmSimpleForm> findAllByDuration(String duration, boolean greater);
    long count();
}
