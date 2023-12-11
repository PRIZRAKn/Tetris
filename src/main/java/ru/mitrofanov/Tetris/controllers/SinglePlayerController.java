package ru.mitrofanov.Tetris.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class SinglePlayerController {
    @GetMapping("/single-player")
    public String single(Model model, Principal principal) {
        return "game";
    }
}
