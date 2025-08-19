package com.swiftlogistics.user.service;

import com.swiftlogistics.user.dto.DriverRegistrationRequest;
import com.swiftlogistics.user.dto.DriverRegistrationResponse;
import com.swiftlogistics.user.entity.Driver;
import com.swiftlogistics.user.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class DriverService {
    
    private final DriverRepository driverRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    
    @Transactional
    public DriverRegistrationResponse registerDriver(DriverRegistrationRequest request) {
        log.info("Starting driver registration for email: {}", request.getEmail());
        
        // Check if email already exists
        if (driverRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        // Check if CDL number already exists
        if (driverRepository.existsByCommercialLicenseNumber(request.getCommercialLicenseNumber())) {
            throw new RuntimeException("Commercial driver license number already registered");
        }
        
        // Generate unique driver ID
        String driverId = generateDriverId();
        
        // Create new driver entity
        Driver driver = new Driver();
        driver.setDriverId(driverId);
        driver.setFirstName(request.getFirstName().trim());
        driver.setLastName(request.getLastName().trim());
        driver.setEmail(request.getEmail().trim().toLowerCase());
        driver.setPhone(request.getPhone().trim());
        driver.setCommercialLicenseNumber(request.getCommercialLicenseNumber().trim().toUpperCase());
        
        // Hash the password
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        driver.setPasswordHash(hashedPassword);
        
        // Set default status as pending
        driver.setStatus(Driver.DriverStatus.PENDING);
        
        // Save driver to database
        Driver savedDriver = driverRepository.save(driver);
        
        log.info("Driver registered successfully with ID: {}", savedDriver.getDriverId());
        
        // Return response
        return new DriverRegistrationResponse(
            savedDriver.getDriverId(),
            savedDriver.getFirstName(),
            savedDriver.getLastName(),
            savedDriver.getEmail(),
            savedDriver.getPhone(),
            savedDriver.getCommercialLicenseNumber(),
            savedDriver.getStatus().toString(),
            savedDriver.getCreatedAt(),
            "Driver registration submitted successfully. Please wait for approval."
        );
    }
    
    private String generateDriverId() {
        String uuid = UUID.randomUUID().toString().replace("-", "");
        return "DRV" + uuid.substring(0, 8).toUpperCase();
    }
    
    public Driver findByEmail(String email) {
        return driverRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Driver not found with email: " + email));
    }
    
    public Driver findByDriverId(String driverId) {
        return driverRepository.findById(driverId)
            .orElseThrow(() -> new RuntimeException("Driver not found with ID: " + driverId));
    }
}
