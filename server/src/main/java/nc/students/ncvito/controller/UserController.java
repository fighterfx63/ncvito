package nc.students.ncvito.controller;

//import jdk.nashorn.internal.objects.annotations.Getter;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Page<User> getAllUsers(@PageableDefault(sort = {"id"}, direction = Sort.Direction.ASC) Pageable pageable) {
        return userService.findAll(pageable);
    }

    @GetMapping("{id}")
    public User getUser(@PathVariable("id") long id) {
        return userService.findById(id);
    }

    @PutMapping
    public User update(@RequestBody User user) {
        return userService.update(user);
    }


}


