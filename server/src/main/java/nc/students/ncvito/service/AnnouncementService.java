package nc.students.ncvito.service;


import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.entity.Favorites;
import nc.students.ncvito.entity.Status;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.repo.AnnouncementRepository;
import nc.students.ncvito.repo.FavoritesRepository;
import nc.students.ncvito.repo.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final UserRepository userRepository;
    private final FavoritesRepository favoritesRepository;


    public AnnouncementService(AnnouncementRepository announcementRepository, UserRepository userRepository, FavoritesRepository favoritesRepository) {
        this.announcementRepository = announcementRepository;
        this.userRepository = userRepository;
        this.favoritesRepository = favoritesRepository;
    }

    public Page<Announcement> findAll(Pageable pageable) {
        return announcementRepository.findAll(pageable);
    }

    public Announcement findById(long id) {
        return announcementRepository.findById(id);
    }

    public void delete(Announcement announcement) {
        announcementRepository.delete(announcement);
    }


    public Announcement update(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    public Announcement create(Announcement announcement, Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        announcement.setAuthor(user);
        announcement.setStatus(Collections.singleton(Status.NOT_MODERATED));
        return announcementRepository.save(announcement);
    }

    public void addToFavorites(Announcement announcement, Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        Favorites favorites = new Favorites();
        favorites.setAnnouncement(announcement);
        favorites.setUser(user);
        favoritesRepository.save(favorites);


    }
}

