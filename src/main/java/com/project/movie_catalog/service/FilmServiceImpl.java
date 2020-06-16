package com.project.movie_catalog.service;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import com.project.movie_catalog.mapper.FilmMapper;
import com.project.movie_catalog.mapper.FilmSimpleMapper;
import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.repo.FilmRepo;
import org.apache.commons.lang.math.NumberUtils;
import org.jetbrains.annotations.NotNull;
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
    public FilmPageSimpleForm findAll(Integer page, Integer size, String sortBy, boolean desc) {
        Pageable paging = getPageable(page, size, sortBy, desc);
        Page<Film> films = repo.findAll(paging);
        int totalPages = films.getTotalPages();
        if (totalPages <= page && totalPages != 0) {
            page = totalPages - 1;
            paging = getPageable(page, size, sortBy, desc);
            films = repo.findAll(paging);
        }
        return FilmPageSimpleForm.builder()
                .totalPages(totalPages)
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByTitle(Integer page, Integer size, String sortBy, String title, boolean desc) {
        Pageable paging = getPageable(page, size, sortBy, desc);
        Page<Film> films = repo.findAllByTitleContainingIgnoreCase(paging, title);
        int totalPages = films.getTotalPages();
        if (totalPages <= page && totalPages != 0) {
            page = totalPages - 1;
            paging = getPageable(page, size, sortBy, desc);
            films = repo.findAllByTitleContainingIgnoreCase(paging, title);
        }
        return FilmPageSimpleForm.builder()
                .totalPages(totalPages)
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByTitleOrg(Integer page, Integer size, String sortBy, String titleOrg, boolean desc) {
        Pageable paging = getPageable(page, size, sortBy, desc);
        Page<Film> films = repo.findAllByTitleOrgContaining(paging, titleOrg);
        int totalPages = films.getTotalPages();
        if (totalPages <= page && totalPages != 0) {
            page = totalPages - 1;
            paging = getPageable(page, size, sortBy, desc);
            films = repo.findAllByTitleOrgContaining(paging, titleOrg);
        }
        return FilmPageSimpleForm.builder()
                .totalPages(totalPages)
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByRate(Integer page, Integer size, String sortBy, String rate, boolean greater, boolean desc) {
        Pageable paging = getPageable(page, size, sortBy, desc);
        Page<Film> films;
        if (greater) {
            films = repo.findAllByRateGreaterThanEqual(paging, rate);
            int totalPages = films.getTotalPages();
            if (totalPages <= page && totalPages != 0) {
                page = totalPages - 1;
                paging = getPageable(page, size, sortBy, desc);
                films = repo.findAllByRateGreaterThanEqual(paging, rate);
            }
        } else {
            films = repo.findAllByRateLessThanEqual(paging, rate);
            int totalPages = films.getTotalPages();
            if (totalPages <= page && totalPages != 0) {
                page = totalPages - 1;
                paging = getPageable(page, size, sortBy, desc);
                films = repo.findAllByRateLessThanEqual(paging, rate);
            }
        }
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByVotes(Integer page, Integer size, String sortBy, String votes, boolean greater, boolean desc) {
        Pageable paging = getPageable(page, size, sortBy, desc);
        Page<Film> films;
        if (greater) {
            films = repo.findAllByVotesGreaterThanEqual(paging, votes);
            int totalPages = films.getTotalPages();
            if (totalPages <= page && totalPages != 0) {
                page = totalPages - 1;
                paging = getPageable(page, size, sortBy, desc);
                films = repo.findAllByVotesGreaterThanEqual(paging, votes);
            }
        } else {
            films = repo.findAllByVotesLessThanEqual(paging, votes);
            int totalPages = films.getTotalPages();
            if (totalPages <= page && totalPages != 0) {
                page = totalPages - 1;
                paging = getPageable(page, size, sortBy, desc);
                films = repo.findAllByVotesLessThanEqual(paging, votes);
            }
        }
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByGenres(Integer page, Integer size, String sortBy, List<String> genres, boolean desc) {
        Pageable paging = getPageable(page, size, sortBy, desc);
        Page<Film> films = repo.findAllByGenresContaining(paging, genres);
        int totalPages = films.getTotalPages();
        if (totalPages <= page && totalPages != 0) {
            page = totalPages - 1;
            paging = getPageable(page, size, sortBy, desc);
            films = repo.findAllByGenresContaining(paging, genres);
        }
        return FilmPageSimpleForm.builder()
                .totalPages(totalPages)
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByYear(Integer page, Integer size, String sortBy, String year, boolean greater, boolean desc) {
        Pageable paging = getPageable(page, size, sortBy, desc);
        Page<Film> films;
        if (greater) {
            films = repo.findAllByYearGreaterThanEqual(paging, year);
            int totalPages = films.getTotalPages();
            if (totalPages <= page && totalPages != 0) {
                page = totalPages - 1;
                paging = getPageable(page, size, sortBy, desc);
                films = repo.findAllByYearGreaterThanEqual(paging, year);
            }
        } else {
            films = repo.findAllByYearLessThanEqual(paging, year);
            int totalPages = films.getTotalPages();
            if (totalPages <= page && totalPages != 0) {
                page = totalPages - 1;
                paging = getPageable(page, size, sortBy, desc);
                films = repo.findAllByYearLessThanEqual(paging, year);
            }
        }
        return FilmPageSimpleForm.builder()
                .totalPages(films.getTotalPages())
                .currentPage(page)
                .films(filmSimpleMapper.mapToDTOList(films.getContent()))
                .build();
    }

    @Override
    public FilmPageSimpleForm findAllByYearBetween(Integer page, Integer size, String sortBy, String yearFirst, String yearSecond, boolean desc) {
        if (NumberUtils.isNumber(yearFirst) && NumberUtils.isNumber(yearSecond)) {
            int yearF = Integer.parseInt(yearFirst) - 1;
            int yearS = Integer.parseInt(yearSecond) + 1;
            Pageable paging = getPageable(page, size, sortBy, desc);
            Page<Film> films = repo.findAllByYearBetween(paging, yearF, yearS);
            int totalPages = films.getTotalPages();
            if (totalPages <= page && totalPages != 0) {
                page = totalPages - 1;
                paging = getPageable(page, size, sortBy, desc);
                films = repo.findAllByYearBetween(paging, yearF, yearS);
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(totalPages)
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
    public FilmPageSimpleForm findAllByRateBetween(Integer page, Integer size, String sortBy, String rateFirst, String rateSecond, boolean desc) {
        if (NumberUtils.isNumber(rateFirst) && NumberUtils.isNumber(rateSecond)) {
            float rateF = Float.parseFloat(rateFirst)-0.01F;
            float rateS = Float.parseFloat(rateSecond)+0.01F;
            Pageable paging = getPageable(page, size, sortBy, desc);
            Page<Film> films = repo.findAllByRateBetween(paging, rateF, rateS);
            int totalPages = films.getTotalPages();
            if (totalPages <= page && totalPages!=0) {
                page = totalPages - 1;
                paging = getPageable(page, size, sortBy, desc);
                films = repo.findAllByRateBetween(paging, rateF, rateS);
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(totalPages)
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
    public FilmPageSimpleForm findAllByDuration(Integer page, Integer size, String sortBy, String duration, boolean greater, boolean desc) {
        Pageable paging = getPageable(page, size, sortBy, desc);
        Page<Film> films;
        if (greater) {
            films = repo.findAllByDurationGreaterThanEqual(paging, duration);
            int totalPages = films.getTotalPages();
            if (totalPages <= page && totalPages != 0) {
                page = totalPages - 1;
                paging = getPageable(page, size, sortBy, desc);
                films = repo.findAllByDurationGreaterThanEqual(paging, duration);
            }
        } else {
            films = repo.findAllByDurationLessThanEqual(paging, duration);
            int totalPages = films.getTotalPages();
            if (totalPages <= page && totalPages != 0) {
                page = totalPages - 1;
                paging = getPageable(page, size, sortBy, desc);
                films = repo.findAllByDurationLessThanEqual(paging, duration);
            }
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

    @NotNull
    private Pageable getPageable(Integer page, Integer size, String sortBy, boolean desc) {
        Sort sort = Sort.by(sortBy);
        if (desc) {
            sort = sort.descending();
        } else {
            sort = sort.ascending();
        }
        return PageRequest.of(page, size, sort);
    }
}
