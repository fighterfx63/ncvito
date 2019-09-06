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
    public Page<Announcement> getAllAnnouncements(Pageable pageable) {
        return announcementService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Announcement getAnnouncement(@PathVariable("id") long id) {
        return announcementService.findById(id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Announcement announcement, Authentication authentication) {
        announcementService.delete(announcement, authentication);
    }

    @PutMapping
    public Announcement update(@RequestBody Announcement announcement, Authentication authentication) {
        return announcementService.update(announcement, authentication);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Announcement create(@RequestBody Announcement announcement, Authentication authentication) {
        return announcementService.create(announcement, authentication);
    }

    @GetMapping("/findBy/{filter}")
    public Page<Announcement> getFilteredAds(@PathVariable("filter") String filter) {
        return announcementService.findByFilter(filter);
    }

    @GetMapping("/findByGetLength/{filter}")
    public long getFilteredAdsLength(@PathVariable("filter") String filter) {
        return announcementService.getListOfAnnouncements(
                announcementService.makeSearchCriteriaList(filter)
        ).size();
    }

    @GetMapping("created")
    public Page<Announcement> getAllAnnouncementsByAuthor(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable, Authentication authentication) {
        return announcementService.findAllByAuthor(pageable, authentication);
    }

    @GetMapping("my_favorites")
    public Page<Announcement> getFavoritesByUser(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable, Authentication authentication) {
        return announcementService.getFavoriteAds(pageable, authentication);
    }

}






