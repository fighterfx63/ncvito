package nc.students.ncvito.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    ANONYMOUS, BANNED, USER, MODERATOR, ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
