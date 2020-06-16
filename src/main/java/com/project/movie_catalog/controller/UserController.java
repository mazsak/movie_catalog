package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.CommentForm;
import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.form.UserForm;
import com.project.movie_catalog.mapper.FilmMapper;
import com.project.movie_catalog.model.User;
import com.project.movie_catalog.security.configuration.JwtTokenUtil;
import com.project.movie_catalog.security.models.JwtRequest;
import com.project.movie_catalog.security.models.JwtResponse;
import com.project.movie_catalog.service.CommentService;
import com.project.movie_catalog.service.FilmService;
import com.project.movie_catalog.service.UserServiceImpl;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final AuthenticationManager authenticationManager;

    private final UserServiceImpl userServiceImpl;
    private final JwtTokenUtil jwtTokenUtil;
    private final CommentService commentService;
    private final FilmService filmService;

    public UserController(AuthenticationManager authenticationManager, UserServiceImpl userServiceImpl, JwtTokenUtil jwtTokenUtil, CommentService commentService, FilmService filmService) {
        this.authenticationManager = authenticationManager;
        this.userServiceImpl = userServiceImpl;
        this.jwtTokenUtil = jwtTokenUtil;
        this.commentService = commentService;
        this.filmService = filmService;
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

    @RequestMapping(method = RequestMethod.POST, value = "/toWatch/{userId}/{filmId}")
    public UserForm addFilmToWatch(@PathVariable String userId, @PathVariable String filmId){
        UserForm user = userServiceImpl.findById(userId);
        FilmForm film = filmService.findById(filmId);
        List<FilmForm> filmsToWatch = user.getFilmsToWatch();
        if (filmsToWatch==null){
            filmsToWatch = new ArrayList<>();
        }
        filmsToWatch.add(film);
        user.setFilmsToWatch(filmsToWatch);
        return userServiceImpl.saveAndReturn(user);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/watched/{userId}/{filmId}")
    public UserForm addFilmWatched(@PathVariable String userId, @PathVariable String filmId){
        UserForm user = userServiceImpl.findById(userId);
        FilmForm film = filmService.findById(filmId);
        List<FilmForm> filmsWatched = user.getFilmsWatched();
        if (filmsWatched==null){
            filmsWatched = new ArrayList<>();
        }
        filmsWatched.add(film);
        user.setFilmsToWatch(filmsWatched);
        return userServiceImpl.saveAndReturn(user);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/toWatch/remove/{userId}/{filmId}")
    public UserForm removeFilmToWatch(@PathVariable String userId, @PathVariable String filmId){
        UserForm user = userServiceImpl.findById(userId);
        FilmForm film = filmService.findById(filmId);
        List<FilmForm> filmsToWatch = user.getFilmsToWatch();
        if (filmsToWatch==null){
            filmsToWatch = new ArrayList<>();
        }
        List<FilmForm> filmsToRemove = filmsToWatch.stream().filter(filmForm -> filmForm.getId().equals(film.getId())).collect(Collectors.toList());
        List<FilmForm> finalFilmsToWatch = filmsToWatch;
        filmsToRemove.forEach(finalFilmsToWatch::remove);
        user.setFilmsToWatch(finalFilmsToWatch);
        return userServiceImpl.saveAndReturn(user);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/watched/remove/{userId}/{filmId}")
    public UserForm removeFilmWatched(@PathVariable String userId, @PathVariable String filmId){
        UserForm user = userServiceImpl.findById(userId);
        FilmForm film = filmService.findById(filmId);
        List<FilmForm> filmsToWatch = user.getFilmsWatched();
        if (filmsToWatch==null){
            filmsToWatch = new ArrayList<>();
        }
        List<FilmForm> filmsToRemove = filmsToWatch.stream().filter(filmForm -> filmForm.getId().equals(film.getId())).collect(Collectors.toList());
        List<FilmForm> finalFilmsToWatch = filmsToWatch;
        filmsToRemove.forEach(finalFilmsToWatch::remove);
        user.setFilmsToWatch(finalFilmsToWatch);
        return userServiceImpl.saveAndReturn(user);
    }
}
