package ru.valeev.course.Entity;

import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;

@Entity
@Table
@Getter
public class Favorites {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @Setter
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @Setter
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "announcement_id")
    private Announcement announcement;
}
