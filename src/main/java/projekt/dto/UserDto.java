package projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import projekt.domain.Role;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDto {
    private String username;
    private String password;
    private Role role;
}
