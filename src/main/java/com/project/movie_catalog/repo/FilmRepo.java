package com.project.movie_catalog.repo;

import com.project.movie_catalog.model.Film;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "Film", path = "films")
public interface FilmRepo extends MongoRepository<Film, String> {
}
