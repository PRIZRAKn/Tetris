package ru.mitrofanov.Tetris.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mitrofanov.Tetris.servises.GameService;
import ru.mitrofanov.Tetris.servises.UserService;

import java.security.Principal;

@RestController
public class GameController {
    @Autowired
    GameService gameService;
    @Autowired
    UserService userService;

    @GetMapping("/online-game/connect")
    public String connect(Principal principal) {
        return gameService.addUserInGame(userService.getUser(principal.getName()));
    }
}
