package com.project.movie_catalog.service;

import com.project.movie_catalog.form.ActorForm;
import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ActorService extends BasicService<ActorForm, String> {

    List<ActorForm> findAll(Integer page, Integer size, String sortBy);
}
