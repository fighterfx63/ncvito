package nc.students.ncvito.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import nc.students.ncvito.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByLogin(String login);



}
