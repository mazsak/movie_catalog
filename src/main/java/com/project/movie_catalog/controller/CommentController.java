package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.CommentForm;
import com.project.movie_catalog.mapper.UserMapper;
import com.project.movie_catalog.model.User;
import com.project.movie_catalog.service.CommentService;
import com.project.movie_catalog.service.CommentServiceImpl;
import com.project.movie_catalog.service.UserServiceImpl;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    private final CommentService commentService;
    private final UserServiceImpl userService;
    private final UserMapper userMapper;

    public CommentController(CommentServiceImpl commentService, UserServiceImpl userService, UserMapper userMapper) {
        this.commentService = commentService;
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping("/all/{idFilm}")
    public List<CommentForm> getAllByIdFilm(@PathVariable String idFilm) {

        return commentService.findAllByIdFilm(idFilm);
    }

//    @GetMapping("/{userName}")
//    public List<CommentForm> getCommentById(@PathVariable String userName){
//        return commentService.findAllByName(userName);
//    }

    @GetMapping("/{userId}")
    public CommentForm getCommentById(@PathVariable String userId){
        return commentService.findById(userId);
    }

    @PostMapping
    public CommentForm create(@RequestBody CommentForm commentForm) {
        return commentService.saveAndReturn(commentForm);
    }
}
