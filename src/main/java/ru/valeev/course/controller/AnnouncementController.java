package ru.valeev.course.controller;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.valeev.course.Entity.Announcement;
import ru.valeev.course.repo.AnnouncementRepo;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({ "/announcements" })


public class  AnnouncementController {

    private final AnnouncementRepo announcementRepo;

    @Autowired

    public AnnouncementController(AnnouncementRepo announcementRepo) {
        this.announcementRepo = announcementRepo;
    }


    @GetMapping
    public List<Announcement> list() {
        return announcementRepo.findAll();
    }

    @GetMapping("{id}")
    public Announcement getOneAnnouncement(@PathVariable("id") Announcement announcement) {
        return announcement;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Announcement announcement) {
        announcementRepo.delete(announcement);
    }

    @PutMapping("{id}")
    public Announcement update(
            @PathVariable("id") Announcement announcementFromDb,
            @RequestBody Announcement announcement
    ) {
        BeanUtils.copyProperties(announcement, announcementFromDb, "id");
        return announcementRepo.save(announcementFromDb);


    }

    @PostMapping
    public Announcement create(@RequestBody Announcement announcement) {
        return announcementRepo.save(announcement);
    }
}




