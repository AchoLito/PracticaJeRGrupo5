package grupo5.lamaldicion.lamaldicion;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;


import java.lang.String;

import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;



@Service
public class ApiStatus
{
    public static final ConcurrentHashMap<String, Long> lastSeen = new ConcurrentHashMap<>();

    public static void hasSeen(String username) 
    {
        lastSeen.put(username, System.currentTimeMillis());
    }

    public static List<String> connectedUsersSince(long threshold) {
        List<String> connected = new ArrayList<>();
        long currentTimeMillis = System.currentTimeMillis();
        for (var entry: lastSeen.entrySet()) {
            if (entry.getValue() > (currentTimeMillis - threshold)) {
                connected.add(entry.getKey());
            }
        }
        return connected;        
    }

    public static int GetSize(long threshold){
        return connectedUsersSince(threshold).size();
    }
}

