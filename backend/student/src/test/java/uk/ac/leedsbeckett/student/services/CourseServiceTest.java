package uk.ac.leedsbeckett.student.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import uk.ac.leedsbeckett.student.domain.dto.CourseDTOs.CreateNewCourseRequestDTO;
import uk.ac.leedsbeckett.student.domain.entities.CourseEntity;
import uk.ac.leedsbeckett.student.domain.enums.Currency;
import uk.ac.leedsbeckett.student.domain.enums.Department;
import uk.ac.leedsbeckett.student.repositories.CourseRepository;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    private CourseService underTest;

    @BeforeEach
    void setup() {
        underTest = new CourseService(courseRepository);
    }

    @Test
    void createNewCourse() {
        // given
        CreateNewCourseRequestDTO course = CreateNewCourseRequestDTO.builder()
                .courseDescription(
                        "Learn Finance & Accounting from Scratch by an Award Winning MBA Professor, Ivy Grad, worked @ Goldman & VC")
                .courseName("Introduction to Finance, Accounting, Modeling and Valuation")
                .currency(Currency.GBP)
                .fees(149.99)
                .department(Department.FINANCE)
                .build();

        underTest.createNewCourse(course);

        ArgumentCaptor<CourseEntity> courseArgumentCaptor = ArgumentCaptor.forClass(CourseEntity.class);

        verify(courseRepository).save(courseArgumentCaptor.capture());

        String capturedStudent = courseArgumentCaptor.getValue().getCourseName();

        assert (capturedStudent.equals(course.getCourseName()));
    }

    @Test
    void getAllCourses() {
        // Given
        underTest.getAllCourses();

        verify(courseRepository).findAll();
    }
}