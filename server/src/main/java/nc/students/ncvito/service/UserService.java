package nc.students.ncvito.service;

import lombok.extern.slf4j.Slf4j;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.repo.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Username with login" + login + "not found."));
        log.debug("Founded user: {}", user);
        return user;
    }

    public User  findById(long id ){
        return userRepository.findById(id);

    }

    public User update(User userFromDb, User user) {
        BeanUtils.copyProperties(user, userFromDb, "id");
        return userRepository.save(userFromDb);
    }
}
