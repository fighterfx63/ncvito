package nc.students.ncvito.controller;

import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.service.AnnouncementService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/announcements/favorites")
public class FavoritesController {


    private final AnnouncementService announcementService;

    public FavoritesController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping
    public List<Announcement> getAllFavorites(Authentication authentication) {
        return announcementService.getAllFavoritesByUser(authentication);
    }

    @PostMapping("/{id}")
    public void addToFavorites(@PathVariable("id") Announcement announcement, Authentication authentication) {
        announcementService.addToFavorites(announcement, authentication);
    }

    @DeleteMapping("/{id}")
    public void deleteFavorites(@PathVariable("id") Announcement announcement, Authentication authentication) {
        announcementService.deleteFavorites(announcement, authentication);
    }

    @GetMapping("/checkIfTheAdIsFavorite/{ad}")
    public Announcement checkIfTheAdIsFavorite(@PathVariable("ad") Announcement announcement, Authentication authentication) {
        return announcementService.checkIfTheAdIsFavorite(announcement, authentication);
    }

}

