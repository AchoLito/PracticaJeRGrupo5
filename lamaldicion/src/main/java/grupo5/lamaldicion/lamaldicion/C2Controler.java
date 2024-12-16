package grupo5.lamaldicion.lamaldicion;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path="/api/chat2")
public class C2Controler
{
    private final List<Mensaje> messages = new ArrayList<>();

    @GetMapping()
    public List<Mensaje> getMessage () 
    {
        return List.of(
            new Mensaje(0, "juan")
        );

    }

    @GetMapping("/g")
    public List<Mensaje> getMessage (@RequestParam(value = "since", defaultValue = "0") long sinceId) 
    {
        List<Mensaje> filteredMessages = messages.stream()
            .filter(message -> message.getId() > sinceId)
            .collect(Collectors.toList());

        return filteredMessages;

    }
    /* 
    @PostMapping("")
    public String pstMessages(@RequestBody ChatRequest request)
     {
        if(request.getMessage() == null || request.getUser() == null || request.getMessage().trim().isEmpty()|| request.getUser().trim().isEmpty())
        {
            return "Message and user are required";
        }

        var writeLock = lock.writeLock();
        writeLock.lock();

        try
        {
            Mensaje message = new Mensaje(
                messageIdGenerator.getAndIncrement(),
                request.getMessage()
            );

            messages.add(message);
        }
        finally
        {
            writeLock.unlock();
        }

        return "Message posted succesfully";
    }*/

    public class Mensaje
    {
        private long id;
        private String text;


        public long getId() {
            return id;
        }

        public String getText() {
            return text;
        }

        public Mensaje(long id,String text){
            this.id=id;
            this.text=text;
        }
    }
}
