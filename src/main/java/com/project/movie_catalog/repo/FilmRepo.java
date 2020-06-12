package com.project.movie_catalog.repo;

import com.project.movie_catalog.model.Film;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilmRepo extends MongoRepository<Film, String>{

    List<Film> findAllByTitleContaining(String title);
    List<Film> findAllByTitleOrgContaining(String title_org);
    List<Film> findAllByRateGreaterThanEqual(String rate);
    List<Film> findAllByRateLessThanEqual(String rate);
    List<Film> findAllByVotesGreaterThanEqual(String votes);
    List<Film> findAllByVotesLessThanEqual(String votes);
    List<Film> findAllByGenres(List<String> genre);
    List<Film> findAllByYearBetween(String yearFirst, String yearSecond);
    List<Film> findAllByYearGreaterThanEqual(String year);
    List<Film> findAllByYearLessThanEqual(String year);
    List<Film> findAllByDurationGreaterThanEqual(String duration);
    List<Film> findAllByDurationLessThanEqual(String duration);
}
