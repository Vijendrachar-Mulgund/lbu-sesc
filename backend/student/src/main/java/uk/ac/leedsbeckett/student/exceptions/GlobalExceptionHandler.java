package uk.ac.leedsbeckett.student.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleInvalidRequest(MethodArgumentNotValidException exception) {
        String error;
        Map<String, String> errorMessage = new HashMap<>();

        error = String.valueOf(exception.getBindingResult().getFieldErrors().get(0));

        errorMessage.put("status", "error");
        errorMessage.put("message", "Please enter valid input!");
        errorMessage.put("error", error);

        return errorMessage;
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public Map<String, String> handleDuplicateField(DataIntegrityViolationException exception) {
        String error;
        Map<String, String> errorMessage = new HashMap<>();

        error = exception.getLocalizedMessage();

        errorMessage.put("status", "error");
        errorMessage.put("message", "The user already exists");
        errorMessage.put("error", error);

        return errorMessage;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(AuthenticationException.class)
    public Map<String, String> handleAuthenticationErrors(AuthenticationException exception) {
        String error;
        Map<String, String> errorMessage = new HashMap<>();

        error = exception.getLocalizedMessage();

        errorMessage.put("status", "error");
        errorMessage.put("message", "Username or password is incorrect!");
        errorMessage.put("error", error);

        return errorMessage;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(RuntimeException.class)
    public Map<String, String> handleTokenExpired(RuntimeException exception) {
        String error;
        Map<String, String> errorMessage = new HashMap<>();

        error = exception.getLocalizedMessage();

        errorMessage.put("status", "error");
        errorMessage.put("message", "Token has expired! Please login again.");
        errorMessage.put("error", error);

        return errorMessage;
    }
}
