package grupo5.lamaldicion.lamaldicion;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.lang.String;
import java.lang.Enum;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.concurrent.locks.ReentrantReadWriteLock;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/users")
public class UsersController
{
    UserDAO userDAO;
    ApiStatus api;

    public UsersController(UserDAO user)
    {
        this.userDAO = user;
        this.api = new ApiStatus();
        //this.lock
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String username)
    {
        User user = this.userDAO.getUser(username);
        if(user.getName() != "")
        {
            this.api.hasSeen(user.getName());
            this.api.connectedUsersSince(10000);
            return ResponseEntity.ok(new UserDTO(user));
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
        
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username)
    {
        userDAO.deleteUser(username);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/")
    public ResponseEntity<?> postUser(@RequestBody User username)
    {
        //username = new User("Javi", "123");
        if(username.getName() == null || username.getPassword() == null)
        {
            return ResponseEntity.badRequest().build();
        }

        User other = this.userDAO.getUser(username.getName());
        if(other.getName() != "")
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        this.api.hasSeen(username.getName());
        this.api.connectedUsersSince(10000);
        userDAO.postUser(username);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{username}")
    public ResponseEntity<?> updatePassword(@RequestBody User username)
    {
        User user = new User(username.getName(), username.getPassword());
        userDAO.updateUser(user);
        this.api.hasSeen(username.getName());
        this.api.connectedUsersSince(10000);
        return ResponseEntity.noContent().build();
    }

}


