package com.banking.repository;

import com.banking.entity.AuthSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthSessionRepository extends JpaRepository<AuthSession, Long> {
    Optional<AuthSession> findByTokenAndIsActive(String token, Boolean isActive);
    Optional<AuthSession> findByRefreshTokenAndIsActive(String refreshToken, Boolean isActive);
}