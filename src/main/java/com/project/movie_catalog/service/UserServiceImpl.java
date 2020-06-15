package com.project.movie_catalog.service;

import com.project.movie_catalog.form.UserForm;
import com.project.movie_catalog.mapper.UserMapper;
import com.project.movie_catalog.model.User;
import com.project.movie_catalog.repo.UserRepo;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserDetailsService {

    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    public UserServiceImpl(UserRepo userRepo, @Lazy PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    @Override
    public User loadUserByUsername(String username) {
        User user = userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return user;
    }

    public boolean register(UserForm userForm){
        if (userRepo.existsByUsername(userForm.getUsername())){
            return false;
        }
        userForm.setPassword(passwordEncoder.encode(userForm.getPassword()));
        User user = userMapper.mapToEntity(userForm);
        userRepo.save(user);
        return true;
    }

}