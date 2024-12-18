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

import org.springframework.stereotype.Component;

public class User {
    private String name;
    private String password;

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public User() {
        this.name = "";
        this.password = "";
    }

    public void setName(String n)
    {
        this.name = n;
    }
    public void setPassword(String p)
    {
        this.password = p;
    }

    public String getName()
    {
        return this.name;
    }
    public String getPassword()
    {
        return this.password;
    }
}
