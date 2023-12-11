package ru.mitrofanov.Tetris.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.mitrofanov.Tetris.servises.ScoreService;
import ru.mitrofanov.Tetris.models.Score;

import java.security.Principal;
import java.util.Comparator;
import java.util.List;

@Controller
public class LeaderBoardController {
    @Autowired
    ScoreService scoreService;
    @GetMapping("/leaderboard")
    public String leaderboard(Principal principal, Model model){
        List<Score> scoreList = scoreService.getScores();
        scoreList.sort(Comparator.comparingInt(Score::getScore).reversed()); // reversed() для сортировки в убывающем порядке

        model.addAttribute("scores", scoreList);
        return "leaderboard";
    }
}
