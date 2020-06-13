package com.project.movie_catalog.mapper;

import com.project.movie_catalog.form.UserForm;
import com.project.movie_catalog.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends BasicMapper<User, UserForm> {
}
