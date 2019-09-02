package nc.students.ncvito.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import nc.students.ncvito.entity.Announcement;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    Page<Announcement> findAll(Pageable pageable);
    Announcement findById(long id);

 }
