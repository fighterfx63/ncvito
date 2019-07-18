package ru.valeev.course.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.valeev.course.Entity.Announcement;

public interface AnnouncementRepo extends JpaRepository<Announcement,Long> {
}
