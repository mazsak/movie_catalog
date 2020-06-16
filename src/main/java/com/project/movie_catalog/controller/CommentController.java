package com.project.movie_catalog.controller;

import com.project.movie_catalog.form.ActorForm;
import com.project.movie_catalog.form.CommentForm;
import com.project.movie_catalog.form.FilmForm;
import com.project.movie_catalog.service.ActorService;
import com.project.movie_catalog.service.ActorServiceImpl;
import com.project.movie_catalog.service.CommentService;
import com.project.movie_catalog.service.CommentServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentServiceImpl commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{idFilm}")
    public List<CommentForm> getAllByIdFilm(@PathVariable String idFilm) {

        return commentService.findAllByIdFilm(idFilm);
    }

    @PostMapping
    public CommentForm create(@RequestBody CommentForm commentForm) {
        return commentService.saveAndReturn(commentForm);
    }
}
