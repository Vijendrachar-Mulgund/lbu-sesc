package uk.ac.leedsbeckett.student.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.ac.leedsbeckett.student.domain.dto.SignupRequestDTO;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;
import uk.ac.leedsbeckett.student.mappers.Mapper;
import uk.ac.leedsbeckett.student.services.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;

    private final Mapper<UserEntity, SignupRequestDTO> userMapper;

    public UserController(UserService userService, Mapper<UserEntity, SignupRequestDTO> userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping(path = "/signup")
    public SignupRequestDTO signUpCreateUser(@RequestBody SignupRequestDTO user) {
       UserEntity userEntity = userMapper.mapFrom(user);
       UserEntity savedUserEntity = userService.createUser(userEntity);
       return userMapper.mapTo(savedUserEntity);
    }
}
