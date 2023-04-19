package com.KnowYourNeighborhood.APIAssessment_Module10.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityUsers;
import com.KnowYourNeighborhood.APIAssessment_Module10.Repository.UsersRepository;
import com.KnowYourNeighborhood.APIAssessment_Module10.Exception.ResourceNotFoundException;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsersRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        EntityUsers user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + email));

        return UsersPrincipal.create(user);
    }

    public UserDetails loadUserById(int id) {
        EntityUsers user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id));

        return UsersPrincipal.create(user);
    }

}
