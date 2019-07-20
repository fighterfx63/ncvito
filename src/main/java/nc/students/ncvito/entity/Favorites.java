package nc.students.ncvito.entity;

import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
public class Favorites {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "announcement_id")
    private Announcement announcement;
}
