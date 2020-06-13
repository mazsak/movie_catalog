package com.project.movie_catalog.repo;

import com.project.movie_catalog.model.Film;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilmRepo extends MongoRepository<Film, String> {

    Page<Film> findAllByTitleContainingIgnoreCase(Pageable pageable, String title);

    Page<Film> findAllByTitleOrgContaining(Pageable pageable, String titleOrg);

    Page<Film> findAllByRateGreaterThanEqual(Pageable pageable, String rate);

    Page<Film> findAllByRateLessThanEqual(Pageable pageable, String rate);

    Page<Film> findAllByRateBetween(Pageable pageable, String rateFirst, String rateSecond);

    Page<Film> findAllByVotesGreaterThanEqual(Pageable pageable, String votes);

    Page<Film> findAllByVotesLessThanEqual(Pageable pageable, String votes);

    Page<Film> findAllByGenresContaining(Pageable pageable, List<String> genre);

    Page<Film> findAllByYearBetween(Pageable pageable, int yearFirst, int yearSecond);

    Page<Film> findAllByYearGreaterThanEqual(Pageable pageable, String year);

    Page<Film> findAllByYearLessThanEqual(Pageable pageable, String year);

    Page<Film> findAllByDurationGreaterThanEqual(Pageable pageable, String duration);

    Page<Film> findAllByDurationLessThanEqual(Pageable pageable, String duration);
}
