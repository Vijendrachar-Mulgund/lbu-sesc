package uk.ac.leedsbeckett.student.domain.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginUserRequestDTO {

    @Email(message = "Please enter your valid email address")
    @NotBlank(message = "Please enter your valid email address")
    private String email;

    @NotBlank(message = "Please enter your valid password")
    private String password;
}
