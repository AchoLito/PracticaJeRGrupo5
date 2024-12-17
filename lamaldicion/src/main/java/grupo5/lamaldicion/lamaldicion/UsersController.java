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
    public UsersController(UserDAO user)
    {
        this.userDAO = user;
        //this.lock
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String username)
    {
        Optional<User> user = this.userDAO.getUser(username);
        if(user.isPresent())
        {
            return ResponseEntity.ok(new UserDTO(user.get()));
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
        
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username)
    {
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/")
    public ResponseEntity<?> postUser(@RequestBody User username)
    //public ResponseEntity<?> postUser(@RequestParam String name)
    {
        username = new User("Javi", "123");
        if(username.getName() == null || username.getPassword() == null)
        {
            return ResponseEntity.badRequest().build();
        }

        Optional<User> other = this.userDAO.getUser(username.getName());
        if(other.isPresent())
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{username}{password}")
    public ResponseEntity<?> updatePassword(@RequestBody User username, @RequestBody PasswordUpadte password)
    {
        return ResponseEntity.noContent().build();
    }

    record PasswordUpadte(String password)
    {
    }
}
