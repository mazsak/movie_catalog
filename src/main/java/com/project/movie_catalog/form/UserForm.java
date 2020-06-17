package com.project.movie_catalog.form;

import com.project.movie_catalog.model.User;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.List;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<FilmForm> getFilmsWatched() {
        return filmsWatched;
    }

    public void setFilmsWatched(List<FilmForm> filmsWatched) {
        this.filmsWatched = filmsWatched;
    }

    public List<FilmForm> getFilmsToWatch() {
        return filmsToWatch;
    }

    public void setFilmsToWatch(List<FilmForm> filmsToWatch) {
        this.filmsToWatch = filmsToWatch;
    }
}
