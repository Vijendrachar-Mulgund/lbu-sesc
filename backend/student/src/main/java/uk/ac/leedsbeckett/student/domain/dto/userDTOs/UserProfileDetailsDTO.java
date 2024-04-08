package uk.ac.leedsbeckett.student.domain.dto.userDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileDetailsDTO {
    private String id;

    private String studentId;

    private String email;

    private String firstname;

    private String lastname;

    private Date createdAt;

    private Date updatedAt;
}
