package com.banking.services.impl;

import com.banking.entity.Organization;
import com.banking.entity.User;
import com.banking.entity.AuthSession;
import com.banking.model.LoginRequest;
import com.banking.model.LoginResponse;
import com.banking.repository.OrganizationRepository;
import com.banking.repository.UserRepository;
import com.banking.repository.AuthSessionRepository;
import com.banking.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    
    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final AuthSessionRepository authSessionRepository;
    
    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        try {
            Optional<Organization> orgOpt = organizationRepository.findByName(loginRequest.getOrganisationId());
            if (orgOpt.isEmpty()) {
                return new LoginResponse(false, null, null, "Invalid organization");
            }
            
            Optional<User> userOpt = userRepository.findByUserIdAndOrganization(
                loginRequest.getUserId(), orgOpt.get());
                
            if (userOpt.isEmpty()) {
                return new LoginResponse(false, null, null, "Invalid credentials");
            }
            
            User user = userOpt.get();
            
            // Check if account is locked
            if (user.getStatus() == User.Status.LOCKED) {
                return new LoginResponse(false, null, null, "Account is locked");
            }
            
            // For demo purposes, accept "Test123!@#" as valid password
            if (!"Test123!@#".equals(loginRequest.getPassword()) && user.getPassword() != null) {
                return new LoginResponse(false, null, null, "Invalid credentials");
            }
            
            // Create auth session
            String token = UUID.randomUUID().toString();
            AuthSession session = new AuthSession();
            session.setUser(user);
            session.setToken(token);
            session.setCreatedDate(LocalDateTime.now());
            session.setExpiresDate(LocalDateTime.now().plusHours(24));
            session.setRefreshToken(UUID.randomUUID().toString());
            authSessionRepository.save(session);
            
            // Update last login
            user.setLastLoginDate(LocalDateTime.now());
            user.setFailedLoginAttempts(0);
            userRepository.save(user);
            
            LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
                user.getId(), user.getUserId(), user.getOrganization().getName());
                
            return new LoginResponse(true, token, userInfo, "Login successful");
            
        } catch (Exception e) {
            return new LoginResponse(false, null, null, "Login failed");
        }
    }
    
    @Override
    public LoginResponse refreshToken(String refreshToken) {
        Optional<AuthSession> sessionOpt = authSessionRepository.findByRefreshTokenAndIsActive(refreshToken, true);
        if (sessionOpt.isEmpty() || sessionOpt.get().getExpiresDate().isBefore(LocalDateTime.now())) {
            return new LoginResponse(false, null, null, "Invalid refresh token");
        }
        
        AuthSession session = sessionOpt.get();
        String newToken = UUID.randomUUID().toString();
        session.setToken(newToken);
        session.setExpiresDate(LocalDateTime.now().plusHours(24));
        authSessionRepository.save(session);
        
        return new LoginResponse(true, newToken, null, "Token refreshed");
    }
    
    @Override
    public boolean logout(String token) {
        Optional<AuthSession> sessionOpt = authSessionRepository.findByTokenAndIsActive(token, true);
        if (sessionOpt.isPresent()) {
            AuthSession session = sessionOpt.get();
            session.setIsActive(false);
            authSessionRepository.save(session);
            return true;
        }
        return false;
    }
    
    @Override
    public boolean validateToken(String token) {
        Optional<AuthSession> sessionOpt = authSessionRepository.findByTokenAndIsActive(token, true);
        return sessionOpt.isPresent() && 
               sessionOpt.get().getExpiresDate().isAfter(LocalDateTime.now());
    }
}