package com.swiftlogistics.user.repository;

import com.swiftlogistics.user.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, String> {
    
    Optional<Driver> findByEmail(String email);
    
    Optional<Driver> findByCommercialLicenseNumber(String commercialLicenseNumber);
    
    boolean existsByEmail(String email);
    
    boolean existsByCommercialLicenseNumber(String commercialLicenseNumber);
}
