package com.KnowYourNeighborhood.APIAssessment_Module10.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.KnowYourNeighborhood.APIAssessment_Module10.OAuth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.KnowYourNeighborhood.APIAssessment_Module10.OAuth2.OAuth2AuthenticationFailureHandler;
import com.KnowYourNeighborhood.APIAssessment_Module10.OAuth2.OAuth2AuthenticationSuccessHandler;

import com.KnowYourNeighborhood.APIAssessment_Module10.Security.JWTAuthEntryPoint;
import com.KnowYourNeighborhood.APIAssessment_Module10.Security.JWTAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JWTAuthEntryPoint authEntryPoint;

    @Autowired
    private com.KnowYourNeighborhood.APIAssessment_Module10.OAuth2.OAuth2UsersService OAuth2UserService;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Autowired
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors().and().csrf().disable()
                // Exception Handling
                .exceptionHandling()
                .authenticationEntryPoint(authEntryPoint)
                .and()

                // Session Management
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                // Authorize Requests
                .authorizeRequests()
                .antMatchers("/store/auth/**", "/oauth2/**").permitAll()
                .antMatchers("/store/users/**", "/store/stores/**").hasRole("USER")
                .and()

                // Login
                // Disabling http basic & form login to only using token based authentication
                .httpBasic()
                .disable()
                .formLogin()
                .disable()

                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorize")
                .authorizationRequestRepository(cookieAuthorizationRequestRepository())
                .and()

                .redirectionEndpoint()
                .baseUri("/oauth2/callback/*")
                .and()

                .userInfoEndpoint()
                .userService(OAuth2UserService)
                .and()

                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler);

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter();
    }

    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }

}
