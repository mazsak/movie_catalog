package com.project.movie_catalog.form;

import com.project.movie_catalog.model.Actor;
import com.project.movie_catalog.model.Comment;
import com.project.movie_catalog.model.Director;
import com.project.movie_catalog.model.FilmActor;
import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class FilmFormWithComments {
    private FilmForm film;
    private List<CommentForm> comments;
}
