package grupo5.lamaldicion.lamaldicion;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.concurrent.locks.ReentrantReadWriteLock;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/chat")
public class ChatController 
{
    private final List<ChatMessage> messages = new ArrayList<>();
    private ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private final AtomicLong messageIdGenerator = new AtomicLong(1); 

    // POST -> Crear un nuevo mensaje
    @PostMapping()
    public ResponseEntity<String> pstMessages(@RequestBody ChatRequest request)
     {
        if(request.getMessage() == null || request.getUser() == null || request.getMessage().trim().isEmpty()|| request.getUser().trim().isEmpty())
        {
            return ResponseEntity.badRequest().body("Message and user are required");
        }

        var writeLock = lock.writeLock();
        writeLock.lock();

        try
        {
            ChatMessage message = new ChatMessage(
                messageIdGenerator.getAndIncrement(),
                request.getUser(),
                request.getMessage()
            );

            messages.add(message);
        }
        finally
        {
            writeLock.unlock();
        }

        return ResponseEntity.ok("Message posted succesfully");
    }

    // GET -> Obtener mensajes desde un ID específico
    @GetMapping()
    public ResponseEntity<List<ChatMessage>> getMessage (@RequestParam(value = "since", defaultValue = "0") long sinceId) 
    {
        var readLock = this.lock.readLock();
        readLock.lock();

        try
        {
            List<ChatMessage> filteredMessages = messages.stream()
                .filter(message -> message.getId() > sinceId)
                .collect(Collectors.toList());

            return ResponseEntity.ok(filteredMessages);
        }
        finally
        {
            readLock.unlock();
        }
    }

    // PUT -> Actualizar un mensaje existente por ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updateMessage (@PathVariable long id, @RequestBody ChatRequest request) 
    {
        if(request.getMessage() == null || request.getMessage().trim().isEmpty())
        {
            return ResponseEntity.badRequest().body("Message content is required");
        }
        
        var writeLock = lock.writeLock();
        writeLock.lock();

        try
        {
            for (ChatMessage message : messages)
            {
                if (message.getId() == id)
                {
                    request.setMessage(request.getMessage());
                    request.setTimestamp(LocalDateTime.now());

                    return ResponseEntity.ok("Message updated successfully");
                }
            }
        }
        finally
        {
            writeLock.unlock();
        }

        return ResponseEntity.notFound().build();
    }

    //DELETE -> Elimina un mensaje por su id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable long id)
    {
        var writeLock = lock.writeLock();
        writeLock.lock();

        try
        {
            boolean removed = messages.removeIf(message -> message.getId() == id);

            if (removed)
            {
                return ResponseEntity.ok("Message deleted succesfully");
            }
            else
            {
                return ResponseEntity.notFound().build();
            }
        }
        finally
        {
            writeLock.unlock();
        }
    }

    
}
