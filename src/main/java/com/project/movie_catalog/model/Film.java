package com.project.movie_catalog.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Document(collection = "Film")
public class Film {

    @Id
    private String id;
    private String title;
    private String titleOrg;
    private List<FilmActor> cast;
    private String premiere;
    private String premiereLocal;
    private List<Director> directors;
    private String rate;
    private String votes;
    private List<String> genres;
    private String year;
    private String duration;
    private String poster;
    private String description;
}
