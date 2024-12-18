package grupo5.lamaldicion.lamaldicion;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class ApiStatus
{
    private static final ConcurrentHashMap<String, Long> lastSeen = new ConcurrentHashMap<>();

    public void hasSeen(String username) 
    {
        this.lastSeen.put(username, System.currentTimeMillis());
    }

    public List<String> connectedUsersSince(long threshold) {
        List<String> connected = new ArrayList<>();
        long currentTimeMillis = System.currentTimeMillis();
        for (var entry: this.lastSeen.entrySet()) {
            if (entry.getValue() > (currentTimeMillis - threshold)) {
                connected.add(entry.getKey());
            }
        }
        return connected;        
    }
}

