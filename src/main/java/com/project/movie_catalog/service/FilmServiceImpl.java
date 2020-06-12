package com.project.movie_catalog.service;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import com.project.movie_catalog.mapper.FilmMapper;
import com.project.movie_catalog.mapper.FilmSimpleMapper;
import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.repo.FilmRepo;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FilmServiceImpl extends BasicServiceImpl<Film, FilmForm, FilmRepo, FilmMapper, String>
        implements FilmService {

    protected final FilmSimpleMapper filmSimpleMapper;

    public FilmServiceImpl(final FilmRepo filmRepo, final FilmMapper mapper, FilmSimpleMapper filmSimpleMapper) {
        super(filmRepo, mapper);
        this.filmSimpleMapper = filmSimpleMapper;
    }

    @Override
    public FilmPageSimpleForm findAll(Integer page, Integer size, String sortBy) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Film> films = repo.findAll(paging);
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByTitle(Integer page, Integer size, String sortBy, String title) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Film> films = repo.findAllByTitleContaining(paging, title);
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByTitleOrg(Integer page, Integer size, String sortBy, String titleOrg) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Film> films = repo.findAllByTitleOrgContaining(paging, titleOrg);
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByRate(Integer page, Integer size, String sortBy, String rate, boolean greater) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Film> films;
        if (greater) {
            films = repo.findAllByRateGreaterThanEqual(paging, rate);
        } else {
            films = repo.findAllByRateLessThanEqual(paging, rate);
        }
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByVotes(Integer page, Integer size, String sortBy, String votes, boolean greater) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Film> films;
        if (greater) {
            films = repo.findAllByVotesGreaterThanEqual(paging, votes);
        } else {
            films = repo.findAllByVotesLessThanEqual(paging, votes);
        }
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByGenres(Integer page, Integer size, String sortBy, List<String> genres) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Film> films = repo.findAllByGenres(paging, genres);
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByYear(Integer page, Integer size, String sortBy, String year, boolean greater) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Film> films;
        if (greater) {
            films = repo.findAllByYearGreaterThanEqual(paging, year);
        } else {
            films = repo.findAllByYearLessThanEqual(paging, year);
        }
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByYearBetween(Integer page, Integer size, String sortBy, String yearFirst, String yearSecond) {
        if (NumberUtils.isNumber(yearFirst) && NumberUtils.isNumber(yearSecond)) {
            yearFirst = String.valueOf(Integer.parseInt(yearFirst) - 1);
            yearSecond = String.valueOf(Integer.parseInt(yearSecond) + 1);
            Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
            Page<Film> films = repo.findAllByYearBetween(paging, yearFirst, yearSecond);
            return FilmPageSimpleForm.builder()
                    .totalPages(films.getTotalPages())
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                    .build();
        } else {
            return FilmPageSimpleForm.builder()
                    .currentPage(0)
                    .totalPages(0)
                    .films(new ArrayList<>())
                    .build();
        }
    }

    @Override
    public FilmPageSimpleForm findAllByDuration(Integer page, Integer size, String sortBy, String duration, boolean greater) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Film> films;
        if (greater) {
            films = repo.findAllByDurationGreaterThanEqual(paging, duration);
        } else {
            films = repo.findAllByDurationLessThanEqual(paging, duration);
        }
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public long count() {
        return repo.count();
    }
}
