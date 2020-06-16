package com.project.movie_catalog.mapper;

import com.project.movie_catalog.form.CommentForm;
import com.project.movie_catalog.model.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper extends BasicMapper<Comment, CommentForm> {
}
