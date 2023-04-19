package com.KnowYourNeighborhood.APIAssessment_Module10.Models;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class RegistrationDto {
    @NotBlank(message = "Name is required!! Please Enter..")

    private String name;

    @Email
    @NotBlank
    private String email;

    @Size(min = 6, message = "Your Password must be at least 6 characters long")
    private String password;

    private String address;

    private String phoneNumber;

}
