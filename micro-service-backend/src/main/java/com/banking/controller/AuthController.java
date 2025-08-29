package com.banking.controller;

import com.banking.model.LoginRequest;
import com.banking.model.LoginResponse;
import com.banking.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        LoginResponse response = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Boolean>> logout(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        boolean success = authService.logout(token);
        return ResponseEntity.ok(Map.of("success", success));
    }
    
    @GetMapping("/validate")
    public ResponseEntity<Map<String, Boolean>> validate(@RequestHeader("Authorization") String authorization) {
        String token = authorization.replace("Bearer ", "");
        boolean valid = authService.validateToken(token);
        return ResponseEntity.ok(Map.of("valid", valid));
    }
}