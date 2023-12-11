package ru.mitrofanov.Tetris.repos;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.mitrofanov.Tetris.models.User;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    Optional<User> findById(Long id);

}
