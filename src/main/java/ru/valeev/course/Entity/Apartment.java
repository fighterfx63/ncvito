package ru.valeev.course.Entity;



import javax.persistence.*;
import java.util.Objects;

@Entity
@Table
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String address;
    private long square;
    private int roomCount;

    private long floor;

    public Apartment() {
    }

    public Apartment(String adress, long square, int roomCount, long floor) {

        this.address = adress;
        this.square = square;
        this.roomCount = roomCount;

        this.floor = floor;
    }


    public Long getId() {
        return id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public long getSquare() {
        return square;
    }

    public void setSquare(long square) {
        this.square = square;
    }

    public int getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(int roomCount) {
        this.roomCount = roomCount;
    }



    public long getFloor() {
        return floor;
    }

    public void setFloor(long floor) {
        this.floor = floor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Apartment apartment = (Apartment) o;
        return square == apartment.square &&
                roomCount == apartment.roomCount &&

                floor == apartment.floor &&
                Objects.equals(id, apartment.id) &&
                Objects.equals(address, apartment.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, address, square, roomCount, floor);
    }

    @Override
    public String toString() {
        return "Apartment{" +
                "id='" + id + '\'' +
                ", address='" + address + '\'' +
                ", square=" + square +
                ", roomCount=" + roomCount +

                ", floor=" + floor +
                '}';
    }
}
