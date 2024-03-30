package uk.ac.leedsbeckett.student.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import uk.ac.leedsbeckett.student.domain.dto.UserDto;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;
import uk.ac.leedsbeckett.student.mappers.Mapper;
import uk.ac.leedsbeckett.student.services.UserService;

@RestController
public class UserController {
    private final UserService userService;

    private final Mapper<UserEntity, UserDto> userMapper;

    public UserController(UserService userService, Mapper<UserEntity, UserDto> userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping(path = "/signup")
    public UserDto signUpCreateUser(@RequestBody UserDto user) {
       UserEntity userEntity =  userMapper.mapFrom(user);
       UserEntity savedUserEntity =  userService.createUser(userEntity);
       return userMapper.mapTo(savedUserEntity);
    }
}
