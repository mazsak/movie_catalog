package com.project.movie_catalog.service;

import com.google.common.collect.Lists;
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
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopServiceImpl extends BasicServiceImpl<Film, FilmForm, FilmRepo, FilmMapper, String>
        implements TopService {

    protected final FilmSimpleMapper filmSimpleMapper;

    public TopServiceImpl(final FilmRepo filmRepo, final FilmMapper mapper, FilmSimpleMapper filmSimpleMapper) {
        super(filmRepo, mapper);
        this.filmSimpleMapper = filmSimpleMapper;
    }

    @Override
    public FilmPageSimpleForm findAll(Integer page, Integer size, String sortBy, boolean desc) {
        List<Film> films = findTop();
        if (!desc) {
            films = Lists.reverse(films);
        }
        int numberOfPages = films.size()/size;
        if (page>= numberOfPages && numberOfPages != 0) {
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(numberOfPages-1)
                    .films(filmSimpleMapper.mapToDTOList(films.subList((numberOfPages-1)*size, numberOfPages*size)))
                    .build();
        } else {
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.subList(page*size, (page+1)*size)))
                    .build();
        }
    }

    @Override
    public FilmPageSimpleForm findAllByTitle(Integer page, Integer size, String sortBy, String title, boolean desc) {
        List<Film> films = findTop().stream().filter(film -> film.getTitle().toLowerCase().contains(title.toLowerCase()))
                .sorted(Comparator.comparing(Film::getTitle))
                .collect(Collectors.toList());
        if (!desc) {
            films = Lists.reverse(films);
        }
        int numberOfPages = films.size()/size;
        if (page>= numberOfPages && numberOfPages != 0) {
            int filterTo = numberOfPages*size;
            if(numberOfPages*size>films.size()){
                filterTo = films.size();
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(numberOfPages-1)
                    .films(filmSimpleMapper.mapToDTOList(films.subList((numberOfPages-1)*size, filterTo)))
                    .build();
        } else {
            int filterTo = (page+1)*size;
            if(filterTo>films.size()){
                filterTo = films.size();
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.subList(page*size, filterTo)))
                    .build();
        }
    }

    @Override
    public FilmPageSimpleForm findAllByTitleOrg(Integer page, Integer size, String sortBy, String titleOrg, boolean desc) {
        List<Film> films = findTop().stream().filter(film -> film.getTitleOrg().toLowerCase().contains(titleOrg.toLowerCase()))
                .sorted(Comparator.comparing(Film::getTitleOrg))
                .collect(Collectors.toList());
        if (!desc) {
            films = Lists.reverse(films);
        }
        int numberOfPages = films.size()/size;
        if (page>= numberOfPages && numberOfPages != 0) {
            int filterTo = numberOfPages*size;
            if(numberOfPages*size>films.size()){
                filterTo = films.size();
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(numberOfPages-1)
                    .films(filmSimpleMapper.mapToDTOList(films.subList((numberOfPages-1)*size, filterTo)))
                    .build();
        } else {
            int filterTo = (page+1)*size;
            if(filterTo>films.size()){
                filterTo = films.size();
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.subList(page*size, filterTo)))
                    .build();
        }
    }

    @Override
    public FilmPageSimpleForm findAllByRate(Integer page, Integer size, String sortBy, String rate, boolean greater, boolean desc) {
        List<Film> films = findTop().stream().sorted(Comparator.comparing(Film::getRate)).collect(Collectors.toList());
        if (!desc) {
            films = Lists.reverse(films);
        }
        if(!NumberUtils.isNumber(rate)){
            return emptyFilmForm();
        }
        if(greater){
            films = films.stream().filter(film -> NumberUtils.createFloat(film.getRate())>=NumberUtils.createFloat(rate)).collect(Collectors.toList());
        } else {
            films = films.stream().filter(film -> NumberUtils.createFloat(film.getRate())<=NumberUtils.createFloat(rate)).collect(Collectors.toList());
        }
        int numberOfPages = films.size()/size;
        if (page>= numberOfPages && numberOfPages != 0) {
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(numberOfPages-1)
                    .films(filmSimpleMapper.mapToDTOList(films.subList((numberOfPages-1)*size, numberOfPages*size)))
                    .build();
        } else {
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.subList(page*size, (page+1)*size)))
                    .build();
        }
    }

    @Override
    public FilmPageSimpleForm findAllByVotes(Integer page, Integer size, String sortBy, String votes, boolean greater, boolean desc) {
        List<Film> films = findTop().stream().sorted(Comparator.comparing(Film::getVotes)).collect(Collectors.toList());
        if (!desc) {
            films = Lists.reverse(films);
        }
        if(!NumberUtils.isNumber(votes)){
            return emptyFilmForm();
        }
        if(greater){
            films = films.stream().filter(film -> NumberUtils.createInteger(film.getVotes())>=NumberUtils.createInteger(votes)).collect(Collectors.toList());
        } else {
            films = films.stream().filter(film -> NumberUtils.createInteger(film.getVotes())<=NumberUtils.createInteger(votes)).collect(Collectors.toList());
        }
        int numberOfPages = films.size()/size;
        if (page>= numberOfPages && numberOfPages != 0) {
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(numberOfPages-1)
                    .films(filmSimpleMapper.mapToDTOList(films.subList((numberOfPages-1)*size, numberOfPages*size)))
                    .build();
        } else {
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.subList(page*size, (page+1)*size)))
                    .build();
        }
    }

    @Override
    public FilmPageSimpleForm findAllByGenres(Integer page, Integer size, String sortBy, List<String> genres, boolean desc) {
        List<Film> films = findTop();
        films = films.stream().filter(film -> film.getGenres().containsAll(genres)).collect(Collectors.toList());
        if (!desc) {
            films = Lists.reverse(films);
        }
        int numberOfPages = films.size()/size;
        if (page>= numberOfPages && numberOfPages != 0) {
            int filterTo = numberOfPages*size;
            if(filterTo>films.size()){
                filterTo = films.size();
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(numberOfPages-1)
                    .films(filmSimpleMapper.mapToDTOList(films.subList((numberOfPages-1)*size, filterTo)))
                    .build();
        } else {
            int filterTo = (page+1)*size;
            if(filterTo>films.size()){
                filterTo = films.size();
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.subList(page*size, filterTo)))
                    .build();
        }
    }

    @Override
    public FilmPageSimpleForm findAllByYear(Integer page, Integer size, String sortBy, String year, boolean greater, boolean desc) {
        List<Film> films = findTop().stream().sorted(Comparator.comparing(Film::getYear)).collect(Collectors.toList());
        if (!desc) {
            films = Lists.reverse(films);
        }
        if(!NumberUtils.isNumber(year)){
            return emptyFilmForm();
        }
        if(greater){
            films = films.stream().filter(film -> NumberUtils.createInteger(film.getVotes())>=NumberUtils.createInteger(year)).collect(Collectors.toList());
        } else {
            films = films.stream().filter(film -> NumberUtils.createInteger(film.getVotes())<=NumberUtils.createInteger(year)).collect(Collectors.toList());
        }
        int numberOfPages = films.size()/size;
        if (page>= numberOfPages && numberOfPages != 0) {
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(numberOfPages-1)
                    .films(filmSimpleMapper.mapToDTOList(films.subList((numberOfPages-1)*size, numberOfPages*size)))
                    .build();
        } else {
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.subList(page*size, (page+1)*size)))
                    .build();
        }
    }

    @Override
    public FilmPageSimpleForm findAllByYearBetween(Integer page, Integer size, String sortBy, String yearFirst, String yearSecond, boolean desc) {
        List<Film> films = findTop();
        films = films.stream().filter(film -> NumberUtils.createInteger(film.getYear())>=NumberUtils.createInteger(yearFirst)
                && NumberUtils.createInteger(film.getYear())<=NumberUtils.createInteger(yearSecond)).collect(Collectors.toList());
        if (!desc) {
            films = Lists.reverse(films);
        }
        int numberOfPages = films.size()/size;
        if (page>= numberOfPages && numberOfPages != 0) {
            int filterTo = numberOfPages*size;
            if(filterTo>films.size()){
                filterTo = films.size();
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(numberOfPages-1)
                    .films(filmSimpleMapper.mapToDTOList(films.subList((numberOfPages-1)*size, filterTo)))
                    .build();
        } else {
            int filterTo = (page+1)*size;
            if(filterTo>films.size()){
                filterTo = films.size();
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.subList(page*size, filterTo)))
                    .build();
        }
    }

    @Override
    public FilmPageSimpleForm findAllByRateBetween(Integer page, Integer size, String sortBy, String rateFirst, String rateSecond, boolean desc) {
        List<Film> films = findTop();
        films = films.stream().filter(film -> NumberUtils.createFloat(film.getRate())>=NumberUtils.createFloat(rateFirst)
                && NumberUtils.createFloat(film.getRate())<=NumberUtils.createFloat(rateSecond)).collect(Collectors.toList());
        if (!desc) {
            films = Lists.reverse(films);
        }
        int numberOfPages = films.size()/size;
        if (page>= numberOfPages && numberOfPages != 0) {
            int filterTo = numberOfPages*size;
            if(filterTo>films.size()){
                filterTo = films.size();
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(numberOfPages-1)
                    .films(filmSimpleMapper.mapToDTOList(films.subList((numberOfPages-1)*size, filterTo)))
                    .build();
        } else {
            int filterTo = (page+1)*size;
            if(filterTo>films.size()){
                filterTo = films.size();
            }
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.subList(page*size, filterTo)))
                    .build();
        }
    }

    @Override
    public FilmPageSimpleForm findAllByDuration(Integer page, Integer size, String sortBy, String duration, boolean greater, boolean desc) {
        List<Film> films = findTop().stream().sorted(Comparator.comparing(Film::getDuration)).collect(Collectors.toList());
        if (!desc) {
            films = Lists.reverse(films);
        }
        if(!NumberUtils.isNumber(duration)){
            return emptyFilmForm();
        }
        if(greater){
            films = films.stream().filter(film -> NumberUtils.createInteger(film.getVotes())>=NumberUtils.createInteger(duration)).collect(Collectors.toList());
        } else {
            films = films.stream().filter(film -> NumberUtils.createInteger(film.getVotes())<=NumberUtils.createInteger(duration)).collect(Collectors.toList());
        }
        int numberOfPages = films.size()/size;
        if (page>= numberOfPages && numberOfPages != 0) {
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(numberOfPages-1)
                    .films(filmSimpleMapper.mapToDTOList(films.subList((numberOfPages-1)*size, numberOfPages*size)))
                    .build();
        } else {
            return FilmPageSimpleForm.builder()
                    .totalPages(numberOfPages)
                    .currentPage(page)
                    .films(filmSimpleMapper.mapToDTOList(films.subList(page*size, (page+1)*size)))
                    .build();
        }
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

    private List<Film> findTop() {
        return repo.findAll(PageRequest.of(1, 100, Sort.by("rate").descending())).getContent();
    }


    private FilmPageSimpleForm emptyFilmForm() {
        return FilmPageSimpleForm.builder()
                .totalPages(0)
                .currentPage(0)
                .films(new ArrayList<>())
                .build();
    }
}
