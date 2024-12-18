package grupo5.lamaldicion.lamaldicion;

import java.util.ArrayList;
import java.util.List;

import java.lang.Integer;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/numberUsers")
public class NumberUsersController
{
    @GetMapping()
    public ResponseEntity<Integer> getNumberUsers(@RequestParam(value = "since", defaultValue = "0") long threshold)
    {
        return ResponseEntity.ok(ApiStatus.GetSize(threshold));
    }
}


