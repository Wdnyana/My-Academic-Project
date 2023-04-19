package com.KnowYourNeighborhood.APIAssessment_Module10.OAuth2.Users;

import java.util.Map;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EAuthProvider;
import com.KnowYourNeighborhood.APIAssessment_Module10.Exception.OAuth2AuthenticationProcessingException;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(EAuthProvider.facebook.toString())) {
            return new FacebookOAuth2UserInfo(attributes);

        } else {
            throw new OAuth2AuthenticationProcessingException(
                    "Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
