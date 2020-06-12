package com.project.movie_catalog.mapper;

import com.project.movie_catalog.form.ActorForm;
import com.project.movie_catalog.model.Actor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ActorMapper extends BasicMapper<Actor, ActorForm> {
}
