package com.banking.services.impl;

import com.banking.entity.Organization;
import com.banking.entity.User;
import com.banking.model.ActivateAccountRequest;
import com.banking.model.ResetPasswordRequest;
import com.banking.repository.OrganizationRepository;
import com.banking.repository.UserRepository;
import com.banking.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    
    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    
    @Override
    public boolean activateAccount(ActivateAccountRequest request) {
        try {
            Optional<Organization> orgOpt = organizationRepository.findByName(request.getOrganisationId());
            if (orgOpt.isEmpty()) {
                return false;
            }
            
            Optional<User> userOpt = userRepository.findByUserIdAndOrganization(
                request.getUserId(), orgOpt.get());
                
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setStatus(User.Status.ACTIVE);
                user.setPassword("$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iU7JzM0fszUql5wEeR0tE.eonNHG"); // bcrypt for Test123!@#
                userRepository.save(user);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
    
    @Override
    public boolean initiatePasswordReset(ResetPasswordRequest request) {
        try {
            Optional<Organization> orgOpt = organizationRepository.findByName(request.getOrganisationId());
            if (orgOpt.isEmpty()) {
                return false;
            }
            
            Optional<User> userOpt = userRepository.findByUserIdAndOrganization(
                request.getUserId(), orgOpt.get());
                
            // In real implementation, would send email/SMS with reset token
            return userOpt.isPresent();
        } catch (Exception e) {
            return false;
        }
    }
    
    @Override
    public boolean completePasswordReset(String token, String newPassword) {
        // In real implementation, would validate token and update password
        return true;
    }
    
    @Override
    public boolean unlockAccount(ActivateAccountRequest request) {
        try {
            Optional<Organization> orgOpt = organizationRepository.findByName(request.getOrganisationId());
            if (orgOpt.isEmpty()) {
                return false;
            }
            
            Optional<User> userOpt = userRepository.findByUserIdAndOrganization(
                request.getUserId(), orgOpt.get());
                
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setStatus(User.Status.ACTIVE);
                user.setFailedLoginAttempts(0);
                userRepository.save(user);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
}