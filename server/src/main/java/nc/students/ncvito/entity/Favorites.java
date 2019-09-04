package nc.students.ncvito.entity;

import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;

@Entity
@Table(name = "Favorites", uniqueConstraints = {
        @UniqueConstraint(name = "UK_FAVORITES_ANNOUNCEMENT_USER", columnNames = {"user_id", "announcement_id"})

})
@Getter
@Setter
public class Favorites {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "announcement_id", nullable = false)
    private Announcement announcement;
}
