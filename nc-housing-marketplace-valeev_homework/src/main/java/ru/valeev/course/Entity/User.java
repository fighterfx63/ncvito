package ru.valeev.course.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "Users")
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Setter
    private String login;

    @Setter
    private String password;

    @Setter
    private String phone;

    @Setter
    private String firstName;

    @Setter
    private String lastName;

    @Setter
    private String email;
    @Setter
    private Date banExpired;
    @Setter
    private String banReason;

    @Setter
    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> role;


    public User() {
    }

    public User(String login, String password, Set<Role> role) {
        this.login = login;
        this.password = password;
        this.role = role;
    }


}
