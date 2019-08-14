package nc.students.ncvito.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    ANONIMUS, BANNED, USER, MODERATOR, ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
