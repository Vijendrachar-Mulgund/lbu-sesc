package uk.ac.leedsbeckett.student.services;

import uk.ac.leedsbeckett.student.domain.entities.UserEntity;

public interface UserService {
     UserEntity createUser(UserEntity userEntity);
}
