package com.banking.services;

import com.banking.entity.Organization;
import com.banking.entity.User;
import com.banking.model.LoginRequest;
import com.banking.model.LoginResponse;
import com.banking.repository.OrganizationRepository;
import com.banking.repository.UserRepository;
import com.banking.repository.AuthSessionRepository;
import com.banking.services.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private OrganizationRepository organizationRepository;

    @Mock
    private AuthSessionRepository authSessionRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    private Organization testOrg;
    private User testUser;

    @BeforeEach
    void setUp() {
        testOrg = new Organization();
        testOrg.setId(1L);
        testOrg.setName("TESTORG001");
        testOrg.setStatus(Organization.Status.ACTIVE);

        testUser = new User();
        testUser.setId(1L);
        testUser.setUserId("TESTUSER001");
        testUser.setOrganization(testOrg);
        testUser.setStatus(User.Status.ACTIVE);
        testUser.setCreatedDate(LocalDateTime.now());
    }

    @Test
    void testLogin_Success() {
        LoginRequest request = new LoginRequest("TESTORG001", "TESTUSER001", "Test123!@#");

        when(organizationRepository.findByName("TESTORG001")).thenReturn(Optional.of(testOrg));
        when(userRepository.findByUserIdAndOrganization("TESTUSER001", testOrg)).thenReturn(Optional.of(testUser));
        when(authSessionRepository.save(any())).thenReturn(null);
        when(userRepository.save(any())).thenReturn(testUser);

        LoginResponse response = authService.login(request);

        assertTrue(response.isSuccess());
        assertNotNull(response.getToken());
    }

    @Test
    void testLogin_InvalidOrganization() {
        LoginRequest request = new LoginRequest("INVALID", "TESTUSER001", "Test123!@#");

        when(organizationRepository.findByName("INVALID")).thenReturn(Optional.empty());

        LoginResponse response = authService.login(request);

        assertFalse(response.isSuccess());
        assertNull(response.getToken());
    }

    @Test
    void testLogin_LockedUser() {
        testUser.setStatus(User.Status.LOCKED);
        LoginRequest request = new LoginRequest("TESTORG001", "TESTUSER001", "Test123!@#");

        when(organizationRepository.findByName("TESTORG001")).thenReturn(Optional.of(testOrg));
        when(userRepository.findByUserIdAndOrganization("TESTUSER001", testOrg)).thenReturn(Optional.of(testUser));

        LoginResponse response = authService.login(request);

        assertFalse(response.isSuccess());
        assertEquals("Account is locked", response.getMessage());
    }
}