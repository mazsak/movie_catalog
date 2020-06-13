package com.project.movie_catalog.service;

import com.project.movie_catalog.form.ActorForm;
import com.project.movie_catalog.mapper.ActorMapper;
import com.project.movie_catalog.model.Actor;
import com.project.movie_catalog.repo.ActorRepo;
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
    public List<ActorForm> findAll(Integer page, Integer size, String sortBy) {
        Pageable paging = PageRequest.of(page, size, Sort.by(sortBy));
        return mapper.mapToDTOList(repo.findAll(paging).getContent());
    }
}
