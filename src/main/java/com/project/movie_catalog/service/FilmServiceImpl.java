package com.project.movie_catalog.service;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmSimpleForm;
import com.project.movie_catalog.mapper.FilmMapper;
import com.project.movie_catalog.mapper.FilmSimpleMapper;
import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.repo.FilmRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FilmServiceImpl extends BasicServiceImpl<Film, FilmForm, FilmRepo, FilmMapper, String>
        implements FilmService{

    protected final FilmSimpleMapper filmSimpleMapper;

    public FilmServiceImpl(final FilmRepo filmRepo, final FilmMapper mapper, FilmSimpleMapper filmSimpleMapper) {
        super(filmRepo, mapper);
        this.filmSimpleMapper = filmSimpleMapper;
    }

    @Override
    public List<FilmSimpleForm> findAll(Integer page, Integer size, String sortBy) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Film> films = repo.findAll(paging);
        return films.hasContent() ? filmSimpleMapper.mapToDTOList(films.getContent()) : new ArrayList<>();
    }

}
