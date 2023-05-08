package com.github.devtoju.backend.common.exceptions;

import org.springframework.http.*;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        List<String> messages = createValidationErrorMessages(e.getFieldErrors());
        return createResponseEntity(messages);
    }

    private ResponseEntity<ApiError> createResponseEntity(List<String> messages) {
        ApiError apiError = ApiError.create(messages);
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    private List<String> createValidationErrorMessages(List<FieldError> fieldErrors) {
        List<String> messages = new ArrayList<>();

        for (FieldError error : fieldErrors) {
            messages.add(buildArgumentNotValidMessage(error));
        }

        return messages;
    }

    private String buildArgumentNotValidMessage(FieldError error) {
        return  "Violate constraint '" +
                error.getCode() +
                "' at '" +
                error.getObjectName() +
                "." +
                error.getField() +
                "': " +
                error.getDefaultMessage();
    }
}
