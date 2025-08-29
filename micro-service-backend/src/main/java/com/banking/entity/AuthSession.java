package com.banking.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "auth_session")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "token", nullable = false, unique = true)
    private String token;
    
    @Column(name = "refresh_token")
    private String refreshToken;
    
    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;
    
    @Column(name = "expires_date", nullable = false)
    private LocalDateTime expiresDate;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
}