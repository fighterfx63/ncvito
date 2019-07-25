package nc.students.ncvito.controller;

import nc.students.ncvito.entity.Role;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.repo.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Collections;

@Controller
public class RegistrationContoller {
    private final UserRepository userRepository;

    public RegistrationContoller(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/registration")
    public String registration() {
        return "registration";
    }

    @PostMapping("/registration")
    public String addUser(User user) {

        User userFromDb = userRepository.findByLogin(user.getLogin());

        if (userFromDb != null) {
            return "registration";
        }

        user.setRole(Collections.singleton(Role.USER));
        userRepository.save(user);

        return "login";
    }
}
