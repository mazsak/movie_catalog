package com.project.movie_catalog.service;

import com.project.movie_catalog.form.UserForm;
import com.project.movie_catalog.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService extends BasicService<UserForm, String> {

    List<UserForm> findAll(Integer page, Integer size, String sortBy);

    Optional<User> findByUsername(String username);
}

