package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.CommentForm;
import com.project.movie_catalog.form.UserForm;
import com.project.movie_catalog.model.User;
import com.project.movie_catalog.security.configuration.JwtTokenUtil;
import com.project.movie_catalog.security.models.JwtRequest;
import com.project.movie_catalog.security.models.JwtResponse;
import com.project.movie_catalog.service.CommentService;
import com.project.movie_catalog.service.UserServiceImpl;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final AuthenticationManager authenticationManager;

    private final UserServiceImpl userServiceImpl;
    private final JwtTokenUtil jwtTokenUtil;
    private final CommentService commentService;

    public UserController(AuthenticationManager authenticationManager, UserServiceImpl userServiceImpl, JwtTokenUtil jwtTokenUtil, CommentService commentService) {
        this.authenticationManager = authenticationManager;
        this.userServiceImpl = userServiceImpl;
        this.jwtTokenUtil = jwtTokenUtil;
        this.commentService = commentService;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/register")
    public boolean register(@RequestBody UserForm userForm){
        return userServiceImpl.register(userForm);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest user){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        User userDetails = userServiceImpl.loadUserByUsername(user.getUsername());
        return ResponseEntity.ok(new JwtResponse(jwtTokenUtil.generateToken(userDetails), userDetails.getRole()));
    }

    @GetMapping("/links/{userId}")
    public UserForm getUserWithLinks(@PathVariable String userId){
        UserForm byUsername = userServiceImpl.findById(userId);
        List<CommentForm> allByName = commentService.findAllByName(byUsername.getUsername());
        allByName.forEach(commentForm ->
                byUsername.add(WebMvcLinkBuilder.linkTo(CommentController.class).slash(commentForm.getId()).withSelfRel()));
        return byUsername;
    }
}
