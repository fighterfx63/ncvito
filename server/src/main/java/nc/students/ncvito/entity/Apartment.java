package nc.students.ncvito.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String address;
    private double square;
    private int roomCount;
    private int floor;

    public Apartment() {
    }

    public Apartment(String address, double square, int roomCount, int floor) {

        this.address = address;
        this.square = square;
        this.roomCount = roomCount;
        this.floor = floor;
    }


}
