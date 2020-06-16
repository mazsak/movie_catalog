package com.project.movie_catalog.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Document(collection = "Comment")
public class Comment {
    @Id
    private String id;
    private String rate;
    private String name;
    private String comment;
    private String date;
    private String idFilm;
}
