package com.project.movie_catalog.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Actor {
    private String name;
    private String poster;
    private String role;
}
