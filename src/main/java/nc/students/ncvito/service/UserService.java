package nc.students.ncvito.service;

import nc.students.ncvito.repo.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override

    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        System.out.println("You are login");
        return userRepo.findByLogin(login);

    }
}
