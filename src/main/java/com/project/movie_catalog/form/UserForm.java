package com.project.movie_catalog.form;

import com.project.movie_catalog.model.User;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserForm extends RepresentationModel<UserForm> {
    private String id;
    private String username;
    private String password;
    private String mail;
    private String role;
    private List<FilmForm> filmsWatched;
    private List<FilmForm> filmsToWatch;
}
