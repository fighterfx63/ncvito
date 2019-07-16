package ru.valeev.course.Entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
public class Announcement {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

   @ManyToOne(fetch = FetchType.EAGER)
   @JoinColumn(name = "user_id")
   private  User autor;

   @OneToOne(fetch = FetchType.EAGER)
   @JoinColumn(name = "apartment_id")
   private  Apartment apartment;

   boolean isforSale;

   private long price;

   private LocalDateTime creationDate;

   public Announcement() {
   }

   public Announcement(User autor, Apartment apartment, boolean isforSale, long price, LocalDateTime creationDate) {
      this.autor = autor;
      this.apartment = apartment;
      this.isforSale = isforSale;
      this.price = price;
      this.creationDate = creationDate;
   }

   public long getId() {
      return id;
   }


   public User getAutor() {
      return autor;
   }

   public void setAutor(User autor) {
      this.autor = autor;
   }

   public Apartment getApartment() {
      return apartment;
   }

   public void setApartment(Apartment apartment) {
      this.apartment = apartment;
   }

   public boolean isIsforSale() {
      return isforSale;
   }

   public void setIsforSale(boolean isforSale) {
      this.isforSale = isforSale;
   }

   public long getPrice() {
      return price;
   }

   public void setPrice(long price) {
      this.price = price;
   }

   public LocalDateTime getCreationDate() {
      return creationDate;
   }

   public void setCreationDate(LocalDateTime creationDate) {
      this.creationDate = creationDate;
   }
}
