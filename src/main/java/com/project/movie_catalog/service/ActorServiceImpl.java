package com.project.movie_catalog.service;

import com.project.movie_catalog.form.ActorForm;
import com.project.movie_catalog.mapper.ActorMapper;
import com.project.movie_catalog.model.Actor;
import com.project.movie_catalog.repo.ActorRepo;
import org.springframework.stereotype.Service;

@Service
public class ActorServiceImpl extends BasicServiceImpl<Actor, ActorForm, ActorRepo, ActorMapper, String>
        implements ActorService {


    public ActorServiceImpl(ActorRepo actorRepo, ActorMapper mapper, ActorMapper actorMapper) {
        super(actorRepo, mapper);
    }

    @Override
    public ActorForm findAll(Integer page, Integer size, String sortBy) {
        return null;
    }
}
