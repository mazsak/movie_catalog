package com.project.movie_catalog.service;

import com.project.movie_catalog.form.ActorForm;
import com.project.movie_catalog.form.ActorPageSimpleForm;
import com.project.movie_catalog.form.FilmPageSimpleForm;
import com.project.movie_catalog.mapper.ActorMapper;
import com.project.movie_catalog.model.Actor;
import com.project.movie_catalog.model.Film;
import com.project.movie_catalog.repo.ActorRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class ActorServiceImpl extends BasicServiceImpl<Actor, ActorForm, ActorRepo, ActorMapper, String>
        implements ActorService {


    public ActorServiceImpl(ActorRepo actorRepo, ActorMapper actorMapper) {
        super(actorRepo, actorMapper);
    }

    @Override
    public ActorPageSimpleForm findAll(Integer page, Integer size, String sortBy) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Actor> actors = repo.findAll(paging);
        int totalPages = actors.getTotalPages();
        if (totalPages <= page && totalPages != 0) {
            page = totalPages - 1;
            paging = PageRequest.of(page, size, Sort.by(sortBy));
            actors = repo.findAll(paging);
        }
        return ActorPageSimpleForm.builder()
                .totalPages(totalPages)
                .currentPage(page)
                .actors(mapper.mapToDTOList(actors.getContent()))
                .build();
    }

    @Override
    public ActorPageSimpleForm findAllByName(Integer page, Integer size, String sortBy, String title) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Actor> actors = repo.findAllByNameContainingIgnoreCase(paging, title);
        int totalPages = actors.getTotalPages();
        if (totalPages <= page && totalPages != 0) {
            page = totalPages - 1;
            paging = PageRequest.of(page, size, Sort.by(sortBy));
            actors = repo.findAllByNameContainingIgnoreCase(paging, title);
        }
        return ActorPageSimpleForm.builder()
                .totalPages(totalPages)
                .currentPage(page)
                .actors(mapper.mapToDTOList(actors.getContent()))
                .build();
    }
}
