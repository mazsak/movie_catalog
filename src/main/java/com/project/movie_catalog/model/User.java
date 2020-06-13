package com.project.movie_catalog.model;

import com.project.movie_catalog.form.FilmSimpleForm;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Document(collection = "User")
public class User {
    @Id
    private String id;

    private String username;
    private String password;
    private String mail;
    private List<FilmSimpleForm> filmsWatched;
    private List<FilmSimpleForm> filmsToWatch;
}
