package org.example.tradex_backend.auth.controller;

import jakarta.validation.Valid;
import org.example.tradex_backend.auth.dto.AuthResponse;
import org.example.tradex_backend.auth.dto.LoginRequest;
import org.example.tradex_backend.auth.dto.RegisterRequest;
import org.example.tradex_backend.auth.dto.UserResponse;
import org.example.tradex_backend.auth.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {

        UserResponse userResponse = authService.register(registerRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(
            @AuthenticationPrincipal Jwt jwt
    ){


        Long userId = Long.valueOf(jwt.getSubject());

        UserResponse response = authService.getCurrentUser(userId);

        return ResponseEntity.ok(response);

    }

}
