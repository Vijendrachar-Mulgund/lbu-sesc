package uk.ac.leedsbeckett.student.services;

import org.springframework.stereotype.Service;
import uk.ac.leedsbeckett.student.domain.dto.UserDto;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;

public interface UserService {
     UserEntity createUser(UserEntity userEntity);
}
