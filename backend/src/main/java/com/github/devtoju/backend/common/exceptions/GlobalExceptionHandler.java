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
        var messages = createValidationErrorMessages(e);
        return createResponseEntity(messages);
    }

    private ResponseEntity<ApiError> createResponseEntity(List<String> messages) {
        ApiError apiError = ApiError.create(messages);
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    private List<String> createValidationErrorMessages(MethodArgumentNotValidException e) {
        var target = e.getTarget();
        var className = target == null ? "" : target.getClass().getSimpleName();
        var messages = new ArrayList<String>();

        for (FieldError error : e.getFieldErrors()) {
            messages.add(createValidationErrorMessage(error, className));
        }

        return messages;
    }

    private String createValidationErrorMessage(FieldError error, String className) {
        return  "Violate constraint '" +
                error.getCode() +
                "' at '" +
                className +
                "." +
                error.getField() +
                "': " +
                error.getDefaultMessage();
    }
}
