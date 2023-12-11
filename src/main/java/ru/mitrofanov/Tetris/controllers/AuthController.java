package ru.mitrofanov.Tetris.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.mitrofanov.Tetris.classes.Password;
import ru.mitrofanov.Tetris.models.User;
import ru.mitrofanov.Tetris.repos.UsersRepository;


@Controller
public class AuthController {
    @Autowired
    private UsersRepository usersAuthRepository;

    @GetMapping("/auth")
    public String auth(Model model) {
        return "auth";
    }

    @PostMapping("/auth")
    public String auth2(Model model, @RequestParam String email, @RequestParam String password,
                       @RequestParam String copypassword, @RequestParam String name) {

        if (password != null && copypassword != null) {
            if (password.equals(copypassword) && !email.isEmpty()) {
                // Вторая страница регистрации
                Password password1 = new Password();
                User user = new User(email, password1.encodePassword(password), name);
                usersAuthRepository.save(user);
                return "redirect:/login";
            }
        }
        return "redirect:/auth?error";
    }
}
