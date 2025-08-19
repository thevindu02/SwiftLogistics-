package com.swiftlogistics.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverRegistrationResponse {
    
    private String driverId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String commercialLicenseNumber;
    private String status;
    private LocalDateTime createdAt;
    private String message;
    
    public DriverRegistrationResponse(String message) {
        this.message = message;
    }
}
