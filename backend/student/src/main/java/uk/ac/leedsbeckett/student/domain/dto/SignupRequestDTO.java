package uk.ac.leedsbeckett.student.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignupRequestDTO {
    private String username;

    private String email;

    private String firstname;

    private String lastname;

    private String password;
}
