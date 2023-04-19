package com.KnowYourNeighborhood.APIAssessment_Module10.OAuth2;

import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityUsers;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityRoles;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.ERole;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EAuthProvider;

import com.KnowYourNeighborhood.APIAssessment_Module10.Exception.OAuth2AuthenticationProcessingException;

import com.KnowYourNeighborhood.APIAssessment_Module10.OAuth2.Users.OAuth2UserInfo;
import com.KnowYourNeighborhood.APIAssessment_Module10.OAuth2.Users.OAuth2UserInfoFactory;

import com.KnowYourNeighborhood.APIAssessment_Module10.Repository.RolesRepository;
import com.KnowYourNeighborhood.APIAssessment_Module10.Repository.UsersRepository;

import com.KnowYourNeighborhood.APIAssessment_Module10.Security.UsersPrincipal;
import com.KnowYourNeighborhood.APIAssessment_Module10.Services.UsersService;

@Service
public class OAuth2UsersService extends DefaultOAuth2UserService {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private RolesRepository rolesRepo;

    @Autowired
    private UsersService userService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the
            // OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory
                .getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(),
                        oAuth2User.getAttributes());

        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<EntityUsers> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());

        EntityUsers user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            if (!user.getProvider()
                    .equals(EAuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UsersPrincipal.create(user, oAuth2User.getAttributes());
    }

    private EntityUsers registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        EntityUsers user = new EntityUsers();

        user.setProvider(EAuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());

        EntityRoles role = rolesRepo.findByName(ERole.ROLE_USER);

        if (role == null) {
            role = userService.createRole(ERole.ROLE_USER);
        }

        user.setRoles(Arrays.asList(role));

        return userRepository.save(user);
    }

    private EntityUsers updateExistingUser(EntityUsers existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        return userRepository.save(existingUser);
    }

}