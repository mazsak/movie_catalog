package com.project.movie_catalog.service;

import com.project.movie_catalog.form.UserForm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService extends BasicService<UserForm, String> {

    List<UserForm> findAll(Integer page, Integer size, String sortBy);
}

