package uk.ac.leedsbeckett.library.domain.dto.userDTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterNewUserRequestDTO {
    @NotNull(message = "Please enter a valid Email address")
    @Email(message = "Please enter a valid Email address")
    private String email;

    @NotNull(message = "Please enter you first name")
    private String firstname;

    @NotNull(message = "Please enter your last name")
    private String lastname;

    @NotBlank(message = "Please enter a strong password")
    private String password;
}
