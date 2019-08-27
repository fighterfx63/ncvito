package nc.students.ncvito.controller;

import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.service.AnnouncementService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/announcements")
public class AnnouncementController {
    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping
    public Page<Announcement> getAllAnnouncements(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return announcementService.findAll(pageable);
    }

    @GetMapping("{id}")
    public Announcement getAnnouncement(@PathVariable("id") long id) {
        return announcementService.findById(id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Announcement announcement) {
        announcementService.delete(announcement);
    }

    @PutMapping
    public Announcement update(@RequestBody Announcement announcement) {
        return announcementService.update(announcement);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Announcement create(@RequestBody Announcement announcement, Authentication authentication) {
        return announcementService.create(announcement, authentication);
    }

    @PostMapping("{id}")
    public void addToFavorites(@PathVariable("id") Announcement announcement, Authentication authentication) {
        announcementService.addToFavorites(announcement, authentication);

    }
}






