package nc.students.ncvito.repo;

import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.entity.Favorites;
import nc.students.ncvito.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoritesRepository extends JpaRepository<Favorites, Long> {
    List<Favorites> findByAnnouncement(Announcement announcement);

    Favorites findByAnnouncementAndUser(Announcement announcement, User user);

    List<Favorites> findAllByUser(User user);
}
