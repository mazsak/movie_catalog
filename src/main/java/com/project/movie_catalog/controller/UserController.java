package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.UserForm;
import com.project.movie_catalog.security.configuration.JwtTokenUtil;
import com.project.movie_catalog.security.models.JwtRequest;
import com.project.movie_catalog.security.models.JwtResponse;
import com.project.movie_catalog.service.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final AuthenticationManager authenticationManager;

    private final UserServiceImpl userServiceImpl;
    private final JwtTokenUtil jwtTokenUtil;

    public UserController(AuthenticationManager authenticationManager, UserServiceImpl userServiceImpl, JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.userServiceImpl = userServiceImpl;
        this.jwtTokenUtil = jwtTokenUtil;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/register")
    public boolean register(@RequestBody UserForm userForm){
        return userServiceImpl.register(userForm);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest user){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        UserDetails userDetails = userServiceImpl.loadUserByUsername(user.getUsername());
        return ResponseEntity.ok(new JwtResponse(jwtTokenUtil.generateToken(userDetails)));
    }
}
