package com.project.movie_catalog.model;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class SearchParam {
    private String title;
    private String title_org;
//    private List<Actor> cast;
    private List<Director> directors;
    private String rate;
    private String votes;
//    private List<String> genres;
    private String year;
    private String duration;
    private String poster;
    private String description;
}
