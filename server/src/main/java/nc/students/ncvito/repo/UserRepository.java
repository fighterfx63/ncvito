package nc.students.ncvito.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import nc.students.ncvito.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLogin(String login);

}
