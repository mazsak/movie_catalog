package com.project.movie_catalog.form;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ActorPageSimpleForm {
    private int totalPages;
    private int currentPage;
    private List<ActorForm> actors;
}
