package ru.valeev.course.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table
@Getter
public class Announcement {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

   @Setter
   @ManyToOne(fetch = FetchType.EAGER)
   @JoinColumn(name = "user_id")
   private  User autor;

   @Setter
   @OneToOne(fetch = FetchType.EAGER)
   @JoinColumn(name = "apartment_id")
   private  Apartment apartment;

   @Setter
   private boolean isSale;

   @Setter
    private  String description;

   @Setter
   private long price;

   private LocalDateTime creationDate;

   @Setter
   @ElementCollection(targetClass = Status.class,fetch = FetchType.EAGER)
   @CollectionTable(name = "announcement_status",joinColumns = @JoinColumn(name = "announcement_id"))
   @Enumerated(EnumType.STRING)
   private Set<Status> status;

   public Announcement() {
   }

   public Announcement(User autor, Apartment apartment, boolean isSale, long price, LocalDateTime creationDate) {
      this.autor = autor;
      this.apartment = apartment;
      this.isSale = isSale;
      this.price = price;
      this.creationDate = creationDate;

   }


}
