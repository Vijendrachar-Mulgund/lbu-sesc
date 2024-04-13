package uk.ac.leedsbeckett.library.domain.dto.userDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateNewUserDTO {
    private String studentId;

    private String firstname;

    private String lastname;

    private String email;

    private String password;
}
