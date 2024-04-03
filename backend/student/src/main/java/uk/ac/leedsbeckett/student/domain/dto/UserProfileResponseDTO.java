package uk.ac.leedsbeckett.student.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileResponseDTO {

    private String status;

    private String message;

    private UserProfileDetailsDTO user;
}
