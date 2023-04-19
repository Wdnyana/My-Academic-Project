package com.KnowYourNeighborhood.APIAssessment_Module10.Models;

public class ResponseAPI {

    private boolean success;
    private String message;

    public ResponseAPI(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
