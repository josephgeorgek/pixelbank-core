package com.banking.services;

import com.banking.model.LoginRequest;
import com.banking.model.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    LoginResponse refreshToken(String refreshToken);
    boolean logout(String token);
    boolean validateToken(String token);
}