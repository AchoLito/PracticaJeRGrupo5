package grupo5.lamaldicion.lamaldicion;

import java.time.LocalDateTime;

public class ChatRequest 
{
    private String user; 
    private String message;
    private LocalDateTime timestamp;
    
    public String getUser()
    {
        return user;
    }

    public void setUser(String user)
    {
        this.user = user;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    public LocalDateTime getTimestamp()
    {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp)
    {
        this.timestamp = timestamp;
    }
}
