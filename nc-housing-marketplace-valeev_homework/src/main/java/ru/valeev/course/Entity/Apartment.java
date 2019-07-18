package ru.valeev.course.Entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    private String address;

    @Setter
    private double square;

    @Setter
    private int roomCount;

    @Setter
    private int floor;

    public Apartment() {
    }

    public Apartment(String adress, double square, int roomCount, int floor) {

        this.address = adress;
        this.square = square;
        this.roomCount = roomCount;
        this.floor = floor;
    }


}
