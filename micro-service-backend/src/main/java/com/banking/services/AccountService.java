package com.banking.services;

import com.banking.model.ActivateAccountRequest;
import com.banking.model.ResetPasswordRequest;

public interface AccountService {
    boolean activateAccount(ActivateAccountRequest request);
    boolean initiatePasswordReset(ResetPasswordRequest request);
    boolean completePasswordReset(String token, String newPassword);
    boolean unlockAccount(ActivateAccountRequest request);
}