package org.example.tradex_backend.common.exception;

public record FieldErrorResponse(
        String field,
        String message
) {
}
