package nc.students.ncvito.controller;


import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.service.AnnouncementService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity getAnnouncement(@PathVariable("id") Long id) {
        Announcement announcementFromDb = announcementService.findbyId(id);


        if (announcementFromDb != null) {
            return ResponseEntity.ok().body(announcementFromDb);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Announcement announcement) {
        announcementService.delete(announcement);
    }

    @PutMapping("{id}")
    public Announcement update(
            @PathVariable("id") Announcement announcementFromDb,
            @RequestBody Announcement announcement
    ) {
        return announcementService.update(announcementFromDb, announcement);


    }

    @PostMapping
    public Announcement create(@RequestBody Announcement announcement) {
        return announcementService.create(announcement);
    }
}






