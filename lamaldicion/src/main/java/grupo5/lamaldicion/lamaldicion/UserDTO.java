package grupo5.lamaldicion.lamaldicion;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class UserDTO {
    private User user;

    public UserDTO(User user) {
        this.user = user;
    }

    public void setName(String n)
    {
        this.user.setName(n);
    }
    public void setPassword(String p)
    {
        this.user.setPassword(p);
    }

    public String getName()
    {
        return this.user.getName();
    }
    public String getPassword()
    {
        return this.user.getPassword();
    }
}

