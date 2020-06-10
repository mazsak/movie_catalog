package com.project.movie_catalog.service;

import com.project.movie_catalog.model.Cos;
import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.repo.CosRepo;
import com.project.movie_catalog.repo.FilmRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CosServiceImpl implements CosService{

    private final CosRepo CosRepo;

    @Override
    public List<Cos> findAll() {
        return CosRepo.findAll();
    }
}
