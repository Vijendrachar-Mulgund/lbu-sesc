package uk.ac.leedsbeckett.student.services.impl;

import org.springframework.stereotype.Service;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;
import uk.ac.leedsbeckett.student.repositories.UsersRepository;
import uk.ac.leedsbeckett.student.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UsersRepository usersRepository;

    public UserServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public UserEntity createUser(UserEntity userEntity) {
        return usersRepository.save(userEntity);
    }
}
