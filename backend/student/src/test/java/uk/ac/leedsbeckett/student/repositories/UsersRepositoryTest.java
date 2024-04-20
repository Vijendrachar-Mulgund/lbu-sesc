package uk.ac.leedsbeckett.student.repositories;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class UsersRepositoryTest {

    @Autowired
    private UsersRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldBeAbleToFindUserByEmail() {
        // Given
        UserEntity user = new UserEntity("123456", "test@test.com", "c56789", "test", "case", "password");

        underTest.save(user);

        String email = "test@test.com";

        UserEntity expected = underTest.findByEmail(email).orElse(null);

        assert expected != null;
        assertEquals(expected.getEmail(), email);
    }

    @Test
    void itShouldBeAbleToFindUserByStudentId() {
        // Given
        UserEntity user = new UserEntity("123456", "test@test.com", "c56789", "test", "case", "password");

        underTest.save(user);

        String studentId = "c56789";

        UserEntity expected = underTest.findByStudentId(studentId).orElse(null);

        assert expected != null;
        assertEquals(expected.getStudentId(), studentId);
    }
}