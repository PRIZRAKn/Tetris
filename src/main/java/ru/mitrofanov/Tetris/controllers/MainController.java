package ru.mitrofanov.Tetris.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.mitrofanov.Tetris.models.User;
import ru.mitrofanov.Tetris.servises.GameService;
import ru.mitrofanov.Tetris.servises.UserService;

import java.security.Principal;

@Controller
public class MainController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String main(Model model, Principal principal) {
        User user = userService.getUser(principal.getName());
        model.addAttribute("name", user.getName());
        return "main";
    }

    @GetMapping("/online-game")
    public String getPage(Principal principal, Model model) {
        model.addAttribute("myId", userService.getUser(principal.getName()).getId());
        return "game-online";
    }

    @GetMapping("/hardmode-game")
    public String getHardPage(Principal principal, Model model) {
        model.addAttribute("myId", userService.getUser(principal.getName()).getId());
        return "hardmode-game";
    }
}
