package nc.students.ncvito.service;


import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.repo.AnnouncementRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;


    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }


    public Page<Announcement> findAll(Pageable pegeable) {
        return announcementRepository.findAll(pegeable);
    }


    public void delete(Announcement announcement) {
        announcementRepository.delete(announcement);
    }


    public Announcement update(Announcement announcementFromDb, Announcement announcement) {
        BeanUtils.copyProperties(announcement, announcementFromDb, "id");
        return announcementRepository.save(announcementFromDb);
    }

    public Announcement create(Announcement announcement) {
        return announcementRepository.save(announcement);
    }
}

