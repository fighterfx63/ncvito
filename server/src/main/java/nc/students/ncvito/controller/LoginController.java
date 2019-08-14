package nc.students.ncvito.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LoginController {
    @GetMapping(produces = "application/json")
    @RequestMapping({ "/login" })
    public Login validateLogin() {
        return new Login("User successfully authenticated");
    }

    private class Login{
        public String status;
        public Login(String status){this.status=status;}
    }

}
