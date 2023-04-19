package com.KnowYourNeighborhood.APIAssessment_Module10.Security;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityUsers;

public class UsersPrincipal implements OAuth2User, UserDetails {
    private int id;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public UsersPrincipal(int id, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static UsersPrincipal create(EntityUsers user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map((role -> new SimpleGrantedAuthority(role.getName().name()))).collect(Collectors.toList());

        return new UsersPrincipal(
                user.getUserId(),
                user.getEmail(),
                user.getPassword(),
                authorities);
    }

    public static UsersPrincipal create(EntityUsers user, Map<String, Object> attributes) {
        UsersPrincipal userPrincipal = UsersPrincipal.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getName() {
        return String.valueOf(id);
    }
}
