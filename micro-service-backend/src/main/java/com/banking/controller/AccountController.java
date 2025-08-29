package com.banking.controller;

import com.banking.model.ActivateAccountRequest;
import com.banking.model.ResetPasswordRequest;
import com.banking.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {
    
    private final AccountService accountService;
    
    @PostMapping("/activate")
    public ResponseEntity<Map<String, Boolean>> activateAccount(@RequestBody ActivateAccountRequest request) {
        boolean success = accountService.activateAccount(request);
        return ResponseEntity.ok(Map.of("success", success));
    }
    
    @PostMapping("/password-reset/initiate")
    public ResponseEntity<Map<String, Boolean>> initiatePasswordReset(@RequestBody ResetPasswordRequest request) {
        boolean success = accountService.initiatePasswordReset(request);
        return ResponseEntity.ok(Map.of("success", success));
    }
    
    @PostMapping("/password-reset/complete")
    public ResponseEntity<Map<String, Boolean>> completePasswordReset(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String password = request.get("password");
        boolean success = accountService.completePasswordReset(token, password);
        return ResponseEntity.ok(Map.of("success", success));
    }
    
    @PostMapping("/unlock")
    public ResponseEntity<Map<String, Boolean>> unlockAccount(@RequestBody ActivateAccountRequest request) {
        boolean success = accountService.unlockAccount(request);
        return ResponseEntity.ok(Map.of("success", success));
    }
}