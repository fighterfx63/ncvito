package nc.students.ncvito.controller;

import nc.students.ncvito.entity.Role;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.repo.UserRepo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collections;
import java.util.Date;
import java.util.Map;

@Controller
public class RegistrationContoller {
    private final UserRepo userRepo;

    public RegistrationContoller(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/registration")
    public String registration() {
        return "registration";
    }

    @PostMapping("/registration")
    public String addUser(User user) {

        User userFromDb = userRepo.findByLogin(user.getLogin());

        if (userFromDb != null) {
            return "registration";
        }

        user.setRole(Collections.singleton(Role.USER));
        userRepo.save(user);

        return "redirect:/login";
    }
}
