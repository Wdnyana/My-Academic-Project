package com.KnowYourNeighborhood.APIAssessment_Module10.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityUsers;

import com.KnowYourNeighborhood.APIAssessment_Module10.Exception.ResourceNotFoundException;

import com.KnowYourNeighborhood.APIAssessment_Module10.Models.UsersDto;
import com.KnowYourNeighborhood.APIAssessment_Module10.Models.ProfileEditDto;
import com.KnowYourNeighborhood.APIAssessment_Module10.Models.FullDataUsers;

import com.KnowYourNeighborhood.APIAssessment_Module10.Services.UsersService;

@RestController
@RequestMapping("/store/users")
public class UsersController {

    @Autowired
    private UsersService userService;

    @GetMapping("")
    public List<UsersDto> listUser() {
        List<UsersDto> listUser = userService.listUser();

        return listUser;
    }

    @GetMapping("/me")
    public FullDataUsers getLoginUser(Authentication authentication) {
        if (userService.findByEmail(authentication.getName()) == null) {
            throw new ResourceNotFoundException("User", "Email", authentication.getName());
        }

        EntityUsers user = userService.findByEmail(authentication.getName());

        UsersDto profile = new UsersDto(user);

        List<String> roles = user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList());

        return new FullDataUsers(profile, user.getStores(), roles);
    }

    @GetMapping("/{userId}")
    public FullDataUsers getUser(@PathVariable("userId") int userId) {
        if (userService.getById(userId) == null) {
            throw new ResourceNotFoundException("User", "userId", userId);
        }

        EntityUsers user = userService.getById(userId);

        UsersDto profile = new UsersDto(user);

        List<String> roles = user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList());

        return new FullDataUsers(profile, user.getStores(), roles);
    }

    @PutMapping("/edit")
    public UsersDto editProfile(@RequestBody ProfileEditDto editProfileDto) {
        EntityUsers user = userService.editProfile(editProfileDto);

        return new UsersDto(user);
    }
}
