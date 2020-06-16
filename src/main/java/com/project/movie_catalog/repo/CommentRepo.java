package com.project.movie_catalog.repo;

import com.project.movie_catalog.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends MongoRepository<Comment, String> {

    List<Comment> findAllByIdFilm(String idFilm);
    List<Comment> findAllByName(String userName);
}
