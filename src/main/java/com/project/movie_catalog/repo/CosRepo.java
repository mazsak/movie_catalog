package com.project.movie_catalog.repo;

import com.project.movie_catalog.model.Cos;
import com.project.movie_catalog.model.Film;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CosRepo extends MongoRepository<Cos, String> {
}
