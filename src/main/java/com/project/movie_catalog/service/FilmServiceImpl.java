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

    @Override
    public List<FilmSimpleForm> findAllByTitle(String title) {
        return filmSimpleMapper.mapToDTOList(repo.findAllByTitleContaining(title));
    }

    @Override
    public List<FilmSimpleForm> findAllByTitleOrg(String title_org) {
        return filmSimpleMapper.mapToDTOList(repo.findAllByTitle_orgContaining(title_org));
    }

    @Override
    public List<FilmSimpleForm> findAllByRate(String rate, boolean greater) {
        if(greater){
            return filmSimpleMapper.mapToDTOList(repo.findAllByRateGreaterThanEqual(rate));
        } else {
            return filmSimpleMapper.mapToDTOList(repo.findAllByRateLessThanEqual(rate));
        }
    }

    @Override
    public List<FilmSimpleForm> findAllByVotes(String votes, boolean greater) {
        if(greater){
            return filmSimpleMapper.mapToDTOList(repo.findAllByVotesGreaterThanEqual(votes));
        } else {
            return filmSimpleMapper.mapToDTOList(repo.findAllByVotesLessThanEqual(votes));
        }
    }

    @Override
    public List<FilmSimpleForm> findAllByGenres(List<String> genres) {
        return filmSimpleMapper.mapToDTOList(repo.findAllByGenres(genres));
    }

    @Override
    public List<FilmSimpleForm> findAllByYear(String year, boolean greater) {
        if(greater){
            return filmSimpleMapper.mapToDTOList(repo.findAllByYearGreaterThanEqual(year));
        } else {
            return filmSimpleMapper.mapToDTOList(repo.findAllByYearLessThanEqual(year));
        }
    }

    @Override
    public List<FilmSimpleForm> findAllByDuration(String duration, boolean greater) {
        if(greater){
            return filmSimpleMapper.mapToDTOList(repo.findAllByDurationGreaterThanEqual(duration));
        } else {
            return filmSimpleMapper.mapToDTOList(repo.findAllByDurationLessThanEqual(duration));
        }
    }

    @Override
    public long count(){
        return repo.count();
    }
}
