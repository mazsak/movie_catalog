package com.project.movie_catalog.repo;

import com.project.movie_catalog.model.Actor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRepo extends MongoRepository<Actor, String> {
}
