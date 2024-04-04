package uk.ac.leedsbeckett.student.domain.dto.userDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponseDTO {
    private String status;

    private String message;

    private String token;

    private UserDetailsDTO user;
}
