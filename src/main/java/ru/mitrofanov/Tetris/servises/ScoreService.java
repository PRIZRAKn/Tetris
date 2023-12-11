package ru.mitrofanov.Tetris.servises;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mitrofanov.Tetris.models.User;
import ru.mitrofanov.Tetris.repos.ScoreRepository;
import ru.mitrofanov.Tetris.models.Score;

import java.util.HashMap;
import java.util.List;

@Service
public class ScoreService {
    @Autowired
    ScoreRepository scoreRepository;
    private HashMap<Long, Integer> hashMap = new HashMap<>();

    public void addScore(User user, int score) {
        if (!hashMap.containsKey(user.getId()) || !hashMap.get(user.getId()).equals(score)) {
            hashMap.put(user.getId(), score);
            Score oldScore = scoreRepository.findByUser(user);
            if(oldScore == null) {
                scoreRepository.save(new Score(user, score));
            } else if (oldScore.getScore() < score) {
                scoreRepository.updateScore(user, score);
            }
        }
    }

    public List<Score> getScores() {
        return scoreRepository.findAll();
    }
}
