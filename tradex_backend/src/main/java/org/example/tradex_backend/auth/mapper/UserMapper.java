package org.example.tradex_backend.auth.mapper;

import org.example.tradex_backend.auth.dto.RegisterRequest;
import org.example.tradex_backend.auth.dto.UserResponse;
import org.example.tradex_backend.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(
            RegisterRequest request,
            String encodedPassword
    ) {
        User user = new User();

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setPasswordHash(encodedPassword);

        return user;
    }

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}


