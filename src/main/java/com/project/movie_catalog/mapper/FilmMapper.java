package com.project.movie_catalog.mapper;

import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.model.Film;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FilmMapper extends BasicMapper<Film, FilmForm> {
}
