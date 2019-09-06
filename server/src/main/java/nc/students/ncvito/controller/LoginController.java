package nc.students.ncvito.controller;

import lombok.extern.slf4j.Slf4j;
import nc.students.ncvito.entity.Role;
import nc.students.ncvito.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Slf4j
public class LoginController {
    @GetMapping(produces = "application/json")
    @RequestMapping({"/login"})
    public Login validateLogin()
    {
        User user = (User) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = user.getUsername();
        Set<Role> userRole = user.getRole();

        log.debug("current username: {}", username);
        return new Login("User successfully authenticated", userRole);
    }

    private class Login {
        public String status;
        public Set<Role> role;

        public Login(String status, Set<Role> role) {
            this.status = status;
            this.role = role;
        }
    }

}

