package com.banking.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private String userId;
    
    @ManyToOne
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;
    
    @Column(name = "password")
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;
    
    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;
    
    @Column(name = "last_login_date")
    private LocalDateTime lastLoginDate;
    
    @Column(name = "failed_login_attempts")
    private Integer failedLoginAttempts = 0;
    
    public enum Status {
        ACTIVE, LOCKED, PENDING, INACTIVE
    }
}