package uk.ac.leedsbeckett.student.domain.dto;

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

    private Boolean isEligibleForGraduation;

    private double outstandingBillAmount;

    private Date createdAt;
}
