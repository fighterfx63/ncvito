package nc.students.ncvito.repo;

import nc.students.ncvito.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import nc.students.ncvito.entity.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    Page<Announcement> findByOrderByCreationDateDesc(Pageable pageable);
    Announcement findById(long id);
    Page<Announcement> findAllByAuthor(User user, Pageable pageable);
}
