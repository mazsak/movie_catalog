package com.project.movie_catalog.model;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class FilmActor {
    private String name;
    private String role;
    private String poster;
}
