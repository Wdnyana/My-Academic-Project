package com.KnowYourNeighborhood.APIAssessment_Module10.Models;

import lombok.Data;

@Data
public class ResponseAuth {
    private String accessToken;
    private String tokenType = "Bearer ";

    public ResponseAuth(String accessToken) {
        this.accessToken = accessToken;
    }
}
