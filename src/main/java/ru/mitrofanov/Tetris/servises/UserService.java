package ru.mitrofanov.Tetris.servises;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mitrofanov.Tetris.models.User;
import ru.mitrofanov.Tetris.repos.UsersRepository;

@Service
public class UserService {
    @Autowired
    private UsersRepository usersRepository;
    public User getUser(String username) { //email
        return usersRepository.findByEmail(username);
    }
}
