package com.project.movie_catalog.service;

import com.project.movie_catalog.form.ActorForm;
import com.project.movie_catalog.form.ActorPageSimpleForm;
import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ActorService extends BasicService<ActorForm, String> {

    List<ActorForm> findAllTop();
    ActorPageSimpleForm findAll(Integer page, Integer size, String sortBy);
    ActorPageSimpleForm findAllByName(Integer page, Integer size, String sortBy, String name, boolean desc);
    ActorPageSimpleForm findAllByRateBetween(Integer page, Integer size, String sortBy, String rateFirst, String rateSecond, boolean desc);
}
