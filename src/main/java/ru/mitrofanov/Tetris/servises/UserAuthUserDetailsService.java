package ru.mitrofanov.Tetris.servises;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.mitrofanov.Tetris.models.User;
import ru.mitrofanov.Tetris.repos.UsersRepository;

@Service
public class UserAuthUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository usersAuthRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User customer = usersAuthRepository.findByEmail(username);
        if (customer == null) {
            throw new UsernameNotFoundException(username);
        }
        return org.springframework.security.core.userdetails.User.withUsername(customer.getEmail()).password(customer.getPassword()).authorities("USER").build();
    }
}
