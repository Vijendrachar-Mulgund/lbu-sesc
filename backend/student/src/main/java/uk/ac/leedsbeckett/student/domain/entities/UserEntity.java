package uk.ac.leedsbeckett.student.domain.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import uk.ac.leedsbeckett.student.domain.enums.Role;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(name = "student_id_unique", columnNames = "studentId"),
        @UniqueConstraint(name = "email_unique", columnNames = "email")
})
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String studentId;

    private String email;

    private String firstname;

    private String lastname;

    private String password;

    private Boolean isEligibleForGraduation;

    private double outstandingBillAmount;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "enrolled_courses",
            joinColumns = {
                    @JoinColumn(name = "student_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "course_id", referencedColumnName = "id")
            }

    )
    @JsonManagedReference
    private Set<CourseEntity> enrolledCourses;

    private Date createdAt;

    private Date updatedAt;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
