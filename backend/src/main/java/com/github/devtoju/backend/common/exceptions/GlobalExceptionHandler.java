package com.github.devtoju.backend.common.exceptions;

import com.github.devtoju.backend.gaptext.exceptions.*;
import com.github.devtoju.backend.security.common.UserInDbAuthException;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(GapTextContainerNotExistException.class)
    public ResponseEntity<ApiError> handleGapTextContainerNotExistException(GapTextContainerNotExistException e) {
        var messages = List.of(e.getMessage());
        return createResponseEntity(messages, e.getHttpStatus());
    }

    @ExceptionHandler(GapTextContainerIdIsNotValidException.class)
    public ResponseEntity<ApiError> handleGapTextContainerIdIsNotValidException(
            GapTextContainerIdIsNotValidException e
    ) {
        var messages = List.of(
                e.getMessage(),
                "URL ID: '" + e.getUrlId() + "'",
                "Container ID: '" + e.getContainerId() + "'"
        );

        return createResponseEntity(messages, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(GapTextContainerCreatorNotExistException.class)
    public ResponseEntity<ApiError> handleGapTextContainerCreatorNotExistException(
            GapTextContainerCreatorNotExistException e
    ) {
        var messages = List.of(e.getMessage());
        return createResponseEntity(messages, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        var messages = createValidationErrorMessages(e);
        return createResponseEntity(messages, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserInDbAuthException.class)
    public ResponseEntity<ApiError> handleUserInDbAuthException(UserInDbAuthException e) {
        var messages = List.of(e.getMessage());
        var status = mapUserInDbExceptionToHttpStatus(e);
        return createResponseEntity(messages, status);
    }

    private ResponseEntity<ApiError> createResponseEntity(List<String> messages, HttpStatus status) {
        var apiError = ApiError.of(messages);
        return new ResponseEntity<>(apiError, status);
    }

    private HttpStatus mapUserInDbExceptionToHttpStatus(UserInDbAuthException e) {
        Map<Class<? extends RuntimeException>, HttpStatus> httpStatusMapping = Map.of(
                DisabledException.class, HttpStatus.UNAUTHORIZED,
                LockedException.class, HttpStatus.LOCKED,
                BadCredentialsException.class, HttpStatus.UNAUTHORIZED
        );

        var causeClass = e.getCause().getClass();
        return httpStatusMapping.getOrDefault(causeClass, HttpStatus.BAD_REQUEST);
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
