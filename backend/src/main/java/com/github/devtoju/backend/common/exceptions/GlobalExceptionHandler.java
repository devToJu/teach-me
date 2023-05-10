package com.github.devtoju.backend.common.exceptions;

import com.github.devtoju.backend.gaptext.exceptions.GapTextContainerIdIsNotValidException;
import com.github.devtoju.backend.gaptext.exceptions.GapTextContainerNotExistException;
import org.springframework.http.*;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(GapTextContainerNotExistException.class)
    public ResponseEntity<ApiError> handleGapTextContainerNotExistException(GapTextContainerNotExistException e) {
        var messages = List.of(e.getMessage());
        return createResponseEntity(messages, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(GapTextContainerIdIsNotValidException.class)
    public ResponseEntity<ApiError> handleGapTextContainerIdIsNotValidException(
            GapTextContainerIdIsNotValidException e
    ) {
        var messages = List.of(
                e.getMessage(),
                "URL Id: " + e.getUrlId(),
                "Container Id: " + e.getContainerId()
        );

        return createResponseEntity(messages, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        var messages = createValidationErrorMessages(e);
        return createResponseEntity(messages, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<ApiError> createResponseEntity(List<String> messages, HttpStatus status) {
        var apiError = ApiError.of(messages);
        return new ResponseEntity<>(apiError, status);
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
        return "Violate constraint '" +
                error.getCode() +
                "' at '" +
                className +
                "." +
                error.getField() +
                "': " +
                error.getDefaultMessage();
    }
}
