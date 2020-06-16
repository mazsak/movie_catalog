package com.project.movie_catalog.form;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class CommentForm {
    private String id;
    private String rate;
    private String name;
    private String comment;
    private String date;
    private String idFilm;
}
