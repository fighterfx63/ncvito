package ru.valeev.course.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.valeev.course.Entity.User;

public interface UserRepo extends JpaRepository<User, Long> {
}
