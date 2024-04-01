package uk.ac.leedsbeckett.student.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import uk.ac.leedsbeckett.student.domain.dto.SignupRequestDTO;
import uk.ac.leedsbeckett.student.domain.entities.UserEntity;
import uk.ac.leedsbeckett.student.mappers.Mapper;

@Component
public class UserMapperImpl implements Mapper<UserEntity, SignupRequestDTO> {

    private final ModelMapper modelMapper;

    public UserMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public SignupRequestDTO mapTo(UserEntity userEntity) {
        return modelMapper.map(userEntity, SignupRequestDTO.class);
    }

    @Override
    public UserEntity mapFrom(SignupRequestDTO signupRequestDTO) {
        return modelMapper.map(signupRequestDTO, UserEntity.class );
    }
}
