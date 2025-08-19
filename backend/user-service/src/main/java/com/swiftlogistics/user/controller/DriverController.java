package com.swiftlogistics.user.controller;

import com.swiftlogistics.user.dto.ApiResponse;
import com.swiftlogistics.user.dto.DriverRegistrationRequest;
import com.swiftlogistics.user.dto.DriverRegistrationResponse;
import com.swiftlogistics.user.service.DriverService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class DriverController {
    
    private final DriverService driverService;
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<DriverRegistrationResponse>> registerDriver(
            @Valid @RequestBody DriverRegistrationRequest request,
            BindingResult bindingResult) {
        
        log.info("Received driver registration request for email: {}", request.getEmail());
        
        try {
            // Check for validation errors
            if (bindingResult.hasErrors()) {
                StringBuilder errorMessage = new StringBuilder();
                bindingResult.getFieldErrors().forEach(error -> 
                    errorMessage.append(error.getField())
                               .append(": ")
                               .append(error.getDefaultMessage())
                               .append("; "));
                
                return ResponseEntity.badRequest()
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                    .header("Access-Control-Allow-Headers", "*")
                    .body(ApiResponse.error("Validation failed: " + errorMessage.toString()));
            }
            
            // Register the driver
            DriverRegistrationResponse response = driverService.registerDriver(request);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                .header("Access-Control-Allow-Headers", "*")
                .body(ApiResponse.success(response, "Driver registration submitted successfully"));
                
        } catch (RuntimeException e) {
            log.error("Error registering driver: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                .header("Access-Control-Allow-Headers", "*")
                .body(ApiResponse.error("Registration failed", e.getMessage()));
                
        } catch (Exception e) {
            log.error("Unexpected error during driver registration", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                .header("Access-Control-Allow-Headers", "*")
                .body(ApiResponse.error("Internal server error", "An unexpected error occurred"));
        }
    }
    
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> healthCheck() {
        return ResponseEntity.ok(ApiResponse.success("User service is running"));
    }
    
    @GetMapping("/{driverId}")
    public ResponseEntity<ApiResponse<DriverRegistrationResponse>> getDriver(@PathVariable String driverId) {
        try {
            var driver = driverService.findByDriverId(driverId);
            
            DriverRegistrationResponse response = new DriverRegistrationResponse(
                driver.getDriverId(),
                driver.getFirstName(),
                driver.getLastName(),
                driver.getEmail(),
                driver.getPhone(),
                driver.getCommercialLicenseNumber(),
                driver.getStatus().toString(),
                driver.getCreatedAt(),
                null
            );
            
            return ResponseEntity.ok(ApiResponse.success(response, "Driver found"));
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Driver not found", e.getMessage()));
        }
    }
}
