package com.project.movie_catalog.service;

import com.project.movie_catalog.model.User;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Service
public class JwtUserDetailsService implements UserDetailsService {

    @NonNull
    private UserService usersService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = usersService.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

}