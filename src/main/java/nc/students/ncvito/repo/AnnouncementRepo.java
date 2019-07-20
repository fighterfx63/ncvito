package nc.students.ncvito.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import nc.students.ncvito.entity.Announcement;

public interface AnnouncementRepo extends JpaRepository<Announcement, Long> {
}
