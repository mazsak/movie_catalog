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
public class FilmSimpleForm {
    private String id;
    private String title;
    private String title_org;
    private String year;
    private String duration;
    private String poster;
    private List<String> genres;
}
