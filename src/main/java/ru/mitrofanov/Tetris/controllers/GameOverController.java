package ru.mitrofanov.Tetris.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.mitrofanov.Tetris.models.User;
import ru.mitrofanov.Tetris.servises.ScoreService;
import ru.mitrofanov.Tetris.servises.UserService;

import java.security.Principal;

@Controller
public class GameOverController {
    @Autowired
    UserService userService;
    @Autowired
    ScoreService scoreService;

    @PostMapping("/game-over")
    public String singleGameOver(Principal principal, @RequestParam(name = "score") Integer score) {
        if (score != 0) {
            User user = userService.getUser(principal.getName());
            scoreService.addScore(user, score);
        }
        return "redirect:/";
    }
}
