package ru.mitrofanov.Tetris.servises;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import ru.mitrofanov.Tetris.models.User;

import java.util.HashMap;

@Service
public class GameService {
    @Autowired
    SimpMessagingTemplate template;
    private Long creator = null;
    synchronized public String addUserInGame(User user) {
        if (creator == null || creator.equals(user.getId())) {
            creator = user.getId();
            return user.getId().toString();
        }
        template.convertAndSend("/topic/" + creator, "connect");
        System.out.println("/topic/" + creator);
        Long temp = creator;
        creator = null;
        return temp.toString();
    }
}
