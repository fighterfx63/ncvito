package nc.students.ncvito.controller;

import nc.students.ncvito.entity.Role;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collections;

@Controller
public class RegistrationController {
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public RegistrationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/registration")
    public ResponseEntity addUser(@RequestBody User user) {

        User userFromDb = userRepository.findByLogin(user.getLogin());

        if (userFromDb != null) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        user.setRole(Collections.singleton(Role.USER));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(HttpStatus.OK);
    }
}
