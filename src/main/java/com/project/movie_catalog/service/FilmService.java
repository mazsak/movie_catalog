package com.project.movie_catalog.service;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmSimpleForm;
import com.project.movie_catalog.model.Film;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FilmService extends BasicService<FilmForm, String> {

    List<FilmSimpleForm> findAll(Integer page, Integer size, String sortBy);
}
