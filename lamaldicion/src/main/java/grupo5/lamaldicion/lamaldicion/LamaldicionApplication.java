package grupo5.lamaldicion.lamaldicion;

import java.lang.String;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;

@SpringBootApplication
@EnableWebSocket
public class LamaldicionApplication implements WebSocketConfigurer {
	private final GameWebSocketHandler gameWebSocketHandler;

	public LamaldicionApplication(GameWebSocketHandler gameWebSocketHandler) {
		this.gameWebSocketHandler = gameWebSocketHandler;
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(gameWebSocketHandler, "/ws")
				.setAllowedOrigins("*"); // Configure appropriate CORS in production
	}

	@Bean
	public GameWebSocketHandler getGameWebSocketHandler() {
		return new GameWebSocketHandler();
	}

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
