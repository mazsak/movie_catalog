package com.project.movie_catalog.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Document
public class Film {
    @Id
    private String id;
    private String title;
    private String title_org;
    private List<Actor> cast;
    private List<Director> directors;
    private float rate;
    private int votes;
    private List<String> genres;
    private int year;
    private int duration;
    private String poster;
    private String description;

    public Film(String title, String title_org, List<Actor> cast, List<Director> directors, float rate, int votes, List<String> genres, int year, int duration, String poster, String description) {
        this.title = title;
        this.title_org = title_org;
        this.cast = cast;
        this.directors = directors;
        this.rate = rate;
        this.votes = votes;
        this.genres = genres;
        this.year = year;
        this.duration = duration;
        this.poster = poster;
        this.description = description;
    }
}
