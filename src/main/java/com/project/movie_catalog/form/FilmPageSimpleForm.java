package com.project.movie_catalog.form;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class FilmPageSimpleForm {
    private int totalPages;
    private int currentPage;
    private List<FilmSimpleForm> films;
}
