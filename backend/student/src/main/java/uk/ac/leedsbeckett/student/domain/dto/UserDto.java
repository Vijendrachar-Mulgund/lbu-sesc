package uk.ac.leedsbeckett.student.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private String id;

    private String userName;

    private String email;

    private String firstName;

    private String lastName;

    private String password;

    private Integer createdAt;

    private Integer updatedAt;
}
