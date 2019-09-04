package nc.students.ncvito.repo;

import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.entity.Favorites;
import nc.students.ncvito.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoritesRepository extends JpaRepository<Favorites, Long> {
    @Query("SELECT f.announcement FROM Favorites f where f.user=?1")
    Page <Announcement> findAllByUser(User user, Pageable page);
}
