package com.project.movie_catalog.search;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class FilmSearchParams {
    private String title;
//    private String titleOrg;
//    private String rate;
//    private String votes;
//    private List<String> genres;
    private String year;
//    private String duration;
}
