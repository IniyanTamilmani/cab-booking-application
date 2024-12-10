package com.utils;

public class CustomException extends Exception {
    private int statusCode;

    public CustomException(int statusCode, String errorMessage) {
        super(errorMessage); 
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
}
