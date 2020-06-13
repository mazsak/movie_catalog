package com.project.movie_catalog.form;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ActorForm {
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
