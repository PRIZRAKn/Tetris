package ru.mitrofanov.Tetris.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

// ***** База данных для аутентификации пользователей *****
@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String password;
    private String name;

    public User() {
    }

    public User(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}