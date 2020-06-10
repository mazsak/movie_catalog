package com.project.movie_catalog.service;

import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.repo.FilmRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FilmServiceImpl implements FilmService{

    private final FilmRepo filmRepo;

    @Override
    public List<Film> findAll() {
        return filmRepo.findAll();
    }
}
