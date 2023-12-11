package ru.mitrofanov.Tetris.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import ru.mitrofanov.Tetris.models.User;
import ru.mitrofanov.Tetris.models.Score;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    Score findByUser(User user);
    @Modifying
    @Transactional
    @Query("update Score s set s.score = ?2 where s.user = ?1")
    void updateScore(User user, Integer score);
}
