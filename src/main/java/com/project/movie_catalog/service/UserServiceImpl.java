package com.project.movie_catalog.service;

import com.project.movie_catalog.form.ActorForm;
import com.project.movie_catalog.form.UserForm;
import com.project.movie_catalog.mapper.UserMapper;
import com.project.movie_catalog.model.User;
import com.project.movie_catalog.repo.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl extends BasicServiceImpl<User, UserForm, UserRepo, UserMapper, String>
    implements UserService{

    public UserServiceImpl(UserRepo userRepo, UserMapper mapper) {
        super(userRepo, mapper);
    }

    @Override
    public List<UserForm> findAll(Integer page, Integer size, String sortBy) {
        return mapper.mapToDTOList(repo.findAll());
    }
}
