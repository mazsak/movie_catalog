package com.project.movie_catalog.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Document(collection = "Actor")
public class Actor {
    private String name;
    private String birthDate;
    private String birthPlace;
    private String votes;
    private String rate;
    private String poster;
    private String sex;
    private String nameFull;
    private String height;
}
