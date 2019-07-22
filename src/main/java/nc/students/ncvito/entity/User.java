package nc.students.ncvito.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "Users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String login;
    private String password;
    private String phone;
    private String firstName;
    private String lastName;
    private String email;
    private Date banExpired;
    private String banReason;

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
