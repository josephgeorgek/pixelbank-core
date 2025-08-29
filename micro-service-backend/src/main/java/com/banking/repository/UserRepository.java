package com.banking.repository;

import com.banking.entity.User;
import com.banking.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserIdAndOrganization(String userId, Organization organization);
}