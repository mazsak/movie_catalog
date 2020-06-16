package com.project.movie_catalog.service;

import com.project.movie_catalog.form.CommentForm;
import com.project.movie_catalog.mapper.CommentMapper;
import com.project.movie_catalog.model.Comment;
import com.project.movie_catalog.repo.CommentRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl extends BasicServiceImpl<Comment, CommentForm, CommentRepo, CommentMapper, String>
        implements CommentService {


    public CommentServiceImpl(CommentRepo commentRepo, CommentMapper mapper) {
        super(commentRepo, mapper);
    }

    @Override
    public List<CommentForm> findAllByIdFilm(String idFilm) {
        return mapper.mapToDTOList(repo.findAllByIdFilm(idFilm));
    }
}
