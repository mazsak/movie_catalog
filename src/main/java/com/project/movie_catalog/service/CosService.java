package com.project.movie_catalog.service;

import com.project.movie_catalog.model.Cos;
import com.project.movie_catalog.model.Film;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CosService {
    List<Cos> findAll();
}
