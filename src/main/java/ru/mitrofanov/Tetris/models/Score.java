package ru.mitrofanov.Tetris.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "scores")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne
    private User user;
    private Integer score;
    private LocalDateTime timeStamp;

    public Score() {
    }

    public Score(User user, Integer score) {
        this.user = user;
        this.score = score;
        this.timeStamp = LocalDateTime.now();
    }
}
