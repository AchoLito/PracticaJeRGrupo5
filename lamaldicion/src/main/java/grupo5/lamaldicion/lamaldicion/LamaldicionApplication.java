package grupo5.lamaldicion.lamaldicion;

import java.lang.String;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LamaldicionApplication {

	@Bean
	@Qualifier("usersPath")
	public String usersPath()
	{
		return new String("users");
	}
	
	public static void main(String[] args) 
	{
		SpringApplication.run(LamaldicionApplication.class, args);
	}

}
