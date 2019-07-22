package nc.students.ncvito.service;


import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.repo.AnnouncementRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AnnouncementService {
    private final AnnouncementRepo announcementRepo;


    public AnnouncementService(AnnouncementRepo announcementRepo) {
        this.announcementRepo = announcementRepo;
    }


    public List<Announcement> findAll() {
        return announcementRepo.findAll();
    }


    public void delete(Announcement announcement) {
        announcementRepo.delete(announcement);
    }


    public Announcement update(Announcement announcementFromDb, Announcement announcement) {
        BeanUtils.copyProperties(announcement, announcementFromDb, "id");
        return announcementRepo.save(announcementFromDb);
    }


    public Announcement create(Announcement announcement) {
        return announcementRepo.save(announcement);
    }
}

