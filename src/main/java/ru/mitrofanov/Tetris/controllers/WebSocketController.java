package ru.mitrofanov.Tetris.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @MessageMapping("/send")
    @SendTo("/topic/public")
    public String chatMessage(@Payload String chatMessage) {
        System.out.println(chatMessage);
        return chatMessage;
    }
}
