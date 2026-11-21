package org.example.tradex_backend.auth.dto;

import org.example.tradex_backend.user.entity.Role;

import java.time.Instant;

public record UserResponse(

        Long id,
        String firstName,
        String lastName,
        String email,
        Role role,
        Boolean isActive,
        Instant createdAt,
        Instant updatedAt
) {

}
