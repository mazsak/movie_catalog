package com.project.movie_catalog.repo;

import com.project.movie_catalog.model.Actor;
import com.project.movie_catalog.model.Film;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRepo extends MongoRepository<Actor, String> {

    Page<Actor> findAllByNameContainingIgnoreCase(Pageable pageable, String title);
}
