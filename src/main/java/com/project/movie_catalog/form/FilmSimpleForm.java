package com.project.movie_catalog.form;

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
    private String titleOrg;
    private String year;
    private String rate;
    private String votes;
    private String duration;
    private String poster;
    private List<String> genres;
}
