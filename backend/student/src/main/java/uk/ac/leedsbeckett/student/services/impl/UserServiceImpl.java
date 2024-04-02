package uk.ac.leedsbeckett.student.services.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uk.ac.leedsbeckett.student.domain.dto.AuthenticationResponse;
import uk.ac.leedsbeckett.student.domain.dto.SignupRequestDTO;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;
import uk.ac.leedsbeckett.student.domain.enums.Role;
import uk.ac.leedsbeckett.student.repositories.UsersRepository;
import uk.ac.leedsbeckett.student.services.JWTService;
import uk.ac.leedsbeckett.student.services.UserService;

@Service
public class UserServiceImpl {

    private final UsersRepository usersRepository;

    private final PasswordEncoder passwordEncoder;

    private final JWTServiceImpl jwtService;

    public UserServiceImpl(UsersRepository usersRepository, PasswordEncoder passwordEncoder, JWTServiceImpl jwtService) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }


    public AuthenticationResponse createUser(SignupRequestDTO request) {
        var user = UserEntity.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        usersRepository.save(user);

        var jwtToken = jwtService.generateJWTToken(user);
        return AuthenticationResponse.builder()
                .username(request.getEmail()).token(jwtToken)
                .build();
    }


}
