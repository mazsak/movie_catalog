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
@Document(collection = "Film")
public class Film {
    @Id
    private String id;
    private String title;
    private String title_org;
    private List<Actor> cast;
    private List<Director> directors;
    private String rate;
    private String votes;
    private List<String> genres;
    private String year;
    private String duration;
    private String poster;
    private String description;

}