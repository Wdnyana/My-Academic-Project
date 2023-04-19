package com.KnowYourNeighborhood.APIAssessment_Module10.Controller;

import java.net.URI;
import java.util.Arrays;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EAuthProvider;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.ERole;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityRoles;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityUsers;

import com.KnowYourNeighborhood.APIAssessment_Module10.Models.ResponseAPI;
import com.KnowYourNeighborhood.APIAssessment_Module10.Models.ResponseAuth;
import com.KnowYourNeighborhood.APIAssessment_Module10.Models.LoginDto;
import com.KnowYourNeighborhood.APIAssessment_Module10.Models.RegistrationDto;

import com.KnowYourNeighborhood.APIAssessment_Module10.Repository.RolesRepository;
import com.KnowYourNeighborhood.APIAssessment_Module10.Repository.UsersRepository;

import com.KnowYourNeighborhood.APIAssessment_Module10.Security.JWTGenerator;

import com.KnowYourNeighborhood.APIAssessment_Module10.Services.UsersService;

@RestController
@RequestMapping("/store/auth")
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsersRepository userRepo;

    @Autowired
    private RolesRepository rolesRepo;

    @Autowired
    private JWTGenerator jwtGenerator;

    @Autowired
    private UsersService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Login
    @PostMapping("login")
    public ResponseEntity<ResponseAuth> login(@Valid @RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new ResponseAuth(token), HttpStatus.OK);
    }

    // Register
    @PostMapping("registration")
    public ResponseEntity<?> addUser(@Valid @RequestBody RegistrationDto registerDto) throws Exception {

        if (userRepo.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Email is taken!", HttpStatus.BAD_REQUEST);
        }

        EntityUsers user = new EntityUsers();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setAddress(registerDto.getAddress());
        user.setPhoneNumber(registerDto.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setProvider(EAuthProvider.local);

        EntityRoles role = rolesRepo.findByName(ERole.ROLE_USER);
        if (role == null) {
            role = userService.createRole(ERole.ROLE_USER);
        }
        user.setRoles(Arrays.asList(role));

        EntityUsers newUser = userRepo.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("store/users/me")
                .buildAndExpand(newUser.getUserId()).toUri();

        return ResponseEntity.created(location)
                .body(new ResponseAPI(true, "User Registration successfully"));

    }

}
