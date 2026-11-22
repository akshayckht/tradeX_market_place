package org.example.tradex_backend.auth.service;


import org.example.tradex_backend.auth.dto.AuthResponse;
import org.example.tradex_backend.auth.dto.LoginRequest;
import org.example.tradex_backend.auth.dto.RegisterRequest;
import org.example.tradex_backend.auth.dto.UserResponse;
import org.example.tradex_backend.auth.exception.AuthenticationFailedException;
import org.example.tradex_backend.auth.exception.EmailAlreadyExistsException;
import org.example.tradex_backend.auth.mapper.UserMapper;
import org.example.tradex_backend.auth.security.JwtService;
import org.example.tradex_backend.auth.security.UserPrincipal;
import org.example.tradex_backend.user.entity.User;
import org.example.tradex_backend.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }


    @Transactional
    public UserResponse register (RegisterRequest registerRequest){

        if(userRepository.existsByEmailIgnoreCase(registerRequest.email())){
           throw new EmailAlreadyExistsException(
                   "An Account with this email already exist"
           );
        }

        String encodedPassword = passwordEncoder.encode(registerRequest.password());

        User user = userMapper.toEntity(registerRequest, encodedPassword);

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);


    }

    // Login
    @Transactional
    public AuthResponse login(LoginRequest request) {

        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken.unauthenticated(
                            request.email(),
                            request.password()
                    )
            );
        } catch (AuthenticationException exception) {
            throw new AuthenticationFailedException();
        }

        UserPrincipal principal =
                (UserPrincipal) authentication.getPrincipal();

        String accessToken =
                jwtService.generateAccessToken(principal);

        User user = userRepository.findById(principal.getId())
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Authenticated user no longer exists."
                        )
                );

        UserResponse userResponse = userMapper.toResponse(user);

        return new AuthResponse(
                accessToken,
                "Bearer",
                jwtService.getAccessTokenTtlSeconds(),
                userResponse
        );
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(AuthenticationFailedException::new);

        return userMapper.toResponse(user);
    }


}
