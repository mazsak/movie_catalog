package com.project.movie_catalog.form;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserForm {
    private String username;
    private String password;
    private String mail;
    private List<FilmSimpleForm> filmsWatched;
    private List<FilmSimpleForm> filmsToWatch;
}
