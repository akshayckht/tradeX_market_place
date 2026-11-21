package org.example.tradex_backend.auth.exception;

public class AuthenticationFailedException extends RuntimeException {

    public AuthenticationFailedException() {
        super("Invalid email or password");
    }
}
