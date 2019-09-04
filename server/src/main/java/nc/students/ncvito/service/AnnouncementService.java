package nc.students.ncvito.service;


import nc.students.ncvito.entity.*;
import nc.students.ncvito.repo.AnnouncementRepository;
import nc.students.ncvito.repo.FavoritesRepository;
import nc.students.ncvito.repo.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


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

    public void delete(Announcement announcement,Authentication authentication) {

        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));

        if (user.getId()==announcement.getAuthor().getId()||user.getRole().contains(Role.ADMIN)||user.getRole().contains(Role.MODERATOR)) {
            List<Favorites> favoritesList = favoritesRepository.findByAnnouncement(announcement);
            for (Favorites favorite : favoritesList) {
                favoritesRepository.delete(favorite);
            }
            announcementRepository.delete(announcement);
        }


    }


    public Announcement update(Announcement announcement,Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));

        if (user.getId()==announcement.getAuthor().getId()||user.getRole().contains(Role.ADMIN)||user.getRole().contains(Role.MODERATOR)) {
            return announcementRepository.save(announcement);
        }
        else return null;
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

    public void deleteFavorites(Announcement announcement, Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        Favorites favorites = favoritesRepository.findByAnnouncementAndUser(announcement, user);
            favoritesRepository.delete(favorites);

    }

  public   List<Announcement> getAllFavoritesByUser(Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        List<Announcement> announcementList = new ArrayList<>();
        List<Favorites> favoritesList = favoritesRepository.findAllByUser(user);
        for (Favorites favorites : favoritesList) {
            announcementList.add(favorites.getAnnouncement());
        }

        return announcementList;

    }
}

