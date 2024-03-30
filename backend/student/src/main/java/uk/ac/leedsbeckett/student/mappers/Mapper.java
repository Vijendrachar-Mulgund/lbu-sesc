package uk.ac.leedsbeckett.student.mappers;

import uk.ac.leedsbeckett.student.domain.dto.UserDto;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;

public interface Mapper<A, B> {

    B mapTo(A a);
    A mapFrom (B b);

}
