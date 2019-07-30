package nc.students.ncvito.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User author;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "apartment_id")
    private Apartment apartment;

    private boolean isSale;
    private String description;
    private long price;
    private LocalDateTime creationDate;

    @ElementCollection(targetClass = Status.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "announcement_status", joinColumns = @JoinColumn(name = "announcement_id"))
    @Enumerated(EnumType.STRING)
    private Set<Status> status;

    public Announcement() {
    }

    public Announcement(User author, Apartment apartment, boolean isSale, long price, LocalDateTime creationDate) {
        this.author = author;
        this.apartment = apartment;
        this.isSale = isSale;
        this.price = price;
        this.creationDate = creationDate;

    }


}
