package nc.students.ncvito.service;


import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.entity.Status;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.repo.AnnouncementRepository;
import nc.students.ncvito.repo.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final UserRepository userRepository;


    public AnnouncementService(AnnouncementRepository announcementRepository, UserRepository userRepository) {
        this.announcementRepository = announcementRepository;
        this.userRepository = userRepository;
    }

    public Page<Announcement> findAll(Pageable pageable) {
        return announcementRepository.findAll(pageable);
    }

    public Announcement findById(long id) {
        return announcementRepository.findById(id);
    }

    public Page<Announcement> findAllByAuthor(Pageable pageable, Authentication authentication) {
        User user = userRepository.findByLogin(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User with login " + authentication.getName() + " not found."));
        return announcementRepository.findAllByAuthor(user, pageable);
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
}

