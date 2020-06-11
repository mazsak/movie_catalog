package com.project.movie_catalog.form;

import com.project.movie_catalog.model.Actor;
import com.project.movie_catalog.model.Director;
import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class FilmForm {
    private String id;
    private String title;
    private String title_org;
    private List<Actor> cast;
    private List<Director> directors;
    private String rate;
    private String votes;
    private List<String> genres;
    private String year;
    private String duration;
    private String poster;
    private String description;
}
