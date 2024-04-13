package uk.ac.leedsbeckett.library.domain.dto.userDTOs;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.ac.leedsbeckett.library.domain.enums.Currency;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateInvoiceDTO {

    private Double amount;

    @Enumerated(EnumType.STRING)
    private Currency currency;

    private String type;

    private String title;

    private String studentId;
}
