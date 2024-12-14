package grupo5.lamaldicion.lamaldicion;

public record ChatMessage(long id, String user, String text) 
{
    
    public long getId() {
        return id;
    }

    public String getText() {
        return text;
    }
}