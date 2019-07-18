package ru.valeev.course.controller;


import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import ru.valeev.course.Entity.Announcement;
import ru.valeev.course.service.AnnouncementService;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/announcements"})


public class AnnouncementController {
    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping
    public List<Announcement> list() {
        return announcementService.findAll();
    }

    @GetMapping("{id}")
    public Announcement getOneAnnouncement(@PathVariable("id") Announcement announcement) {
        return announcement;
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
        return announcementService.update(announcementFromDb,announcement);


    }

    @PostMapping
    public Announcement create(@RequestBody Announcement announcement) {
        return announcementService.create(announcement);
    }
}






