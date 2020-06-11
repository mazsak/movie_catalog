package com.project.movie_catalog.repo;

import com.project.movie_catalog.model.Film;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilmRepo extends MongoRepository<Film, String> {
}
