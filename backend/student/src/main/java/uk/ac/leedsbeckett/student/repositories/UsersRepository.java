package uk.ac.leedsbeckett.student.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;

@Repository
public interface UsersRepository extends CrudRepository<UserEntity, String> {

}
