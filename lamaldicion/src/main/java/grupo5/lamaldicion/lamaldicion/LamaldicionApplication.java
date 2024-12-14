package grupo5.lamaldicion.lamaldicion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"java.lang.String"})
@EntityScan("java.lang.String")
public class LamaldicionApplication {

	public static void main(String[] args) {
		SpringApplication.run(LamaldicionApplication.class, args);
	}

}
