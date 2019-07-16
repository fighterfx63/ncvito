package ru.valeev.course.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

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
   boolean isSale;

   @Setter
   boolean isFavorites;

   @Setter
   private long price;

   private LocalDateTime creationDate;

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
