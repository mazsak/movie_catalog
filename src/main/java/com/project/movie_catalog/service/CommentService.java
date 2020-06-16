package com.project.movie_catalog.service;

import com.project.movie_catalog.form.CommentForm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService extends BasicService<CommentForm, String> {

    List<CommentForm> findAllByIdFilm(String idFilm);
    List<CommentForm> findAllByName(String userName);
}
