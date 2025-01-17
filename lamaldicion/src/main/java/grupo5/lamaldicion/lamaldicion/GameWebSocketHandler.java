package grupo5.lamaldicion.lamaldicion;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.*;

/**
 * WebSocket handler for a real-time multiplayer game where players compete to
 * collect squares.
 * Players are matched in pairs and compete for 60 seconds to collect randomly
 * spawning squares.
 */
@Component
public class GameWebSocketHandler extends TextWebSocketHandler {
    // Thread-safe collections for managing game state
    private Queue<Game> gameList = new ConcurrentLinkedQueue<>();
    private final Map<String, Player> players = new ConcurrentHashMap<>();
    private final Map<String, Game> games = new ConcurrentHashMap<>();
    private final Queue<WebSocketSession> waitingPlayers = new ConcurrentLinkedQueue<>();
    private final ObjectMapper mapper = new ObjectMapper();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    /**
     * Represents a player in the game with their position, score, and WebSocket
     * session.
     */
    private static class Player {
        WebSocketSession session;
        int seleccion;
        double x;
        double y;
       // int score;
        int playerId;

        Player(WebSocketSession session) {
            this.session = session;
            this.seleccion = 0;
            //this.score = 0;
        }
    }

    /**
     * Represents an active game between two players.
     * Includes game state like the current square, time remaining, and scheduled
     * tasks.
     */
    private static class Game {
        Player player1;
        Player player2;
       // Square square;
        int timeLeft = 400; // Game duration in seconds
        ScheduledFuture<?> timerTask;

        Game(Player player1, Player player2) {
            this.player1 = player1;
            this.player2 = player2;
        }
    }

    /**
     * Represents a collectible square in the game with random coordinates.
     * Squares spawn within the bounds: x(50-750), y(50-550)
     */
    // private static class Square {
    //     int x;
    //     int y;

    //     Square() {
    //         Random rand = new Random();
    //         this.x = rand.nextInt(700) + 50; // 50-750 range
    //         this.y = rand.nextInt(500) + 50; // 50-550 range
    //     }
    // }

    /**
     * Handles new WebSocket connections by creating a player and adding them to the
     * waiting queue.
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // Sequential access/write for waitingPlayers
        waitingPlayers.add(session);
        players.put(session.getId(), new Player(session));
        System.out.println(waitingPlayers.size());

        synchronized (this) {
            // Ensure that create game is thread-safe
            checkAndCreateGame();
        }
    }

    /**
     * Attempts to create a new game if there are at least 2 players waiting.
     * Sets up initial player positions and starts the game.
     */
    private synchronized void checkAndCreateGame() {
        if (waitingPlayers.size() >= 2) {
            WebSocketSession session1 = waitingPlayers.poll();
            WebSocketSession session2 = waitingPlayers.poll();

            if (session1 != null && session2 != null) {

                Player player1 = players.get(session1.getId());
                Player player2 = players.get(session2.getId());

                // Initialize player positions and IDs
                player1.playerId = 1;
                player2.playerId = 2;
                // player1.x = 100; // Left side of screen
                // player1.y = 300; // Middle height
                // player2.x = 700; // Right side of screen
                // player2.y = 300; // Middle height

                Game game = new Game(player1, player2);
                games.put(session1.getId(), game);
                games.put(session2.getId(), game);
                startGame(game);      
                gameList.add(game);         
            }
        }
    }

    /**
     * Initializes a new game by sending initial states to players and starting the
     * game loop.
     * Message format 'i': Initial game state with player positions and colors
     */
    private void startGame(Game game) {
        // Create initial player data: [x, y, playerId, color]
        // List<List<Object>> playersData = Arrays.asList(
        //     Arrays.asList(game.player1.x, game.player1.y, 1, 0xff0000), // Player 1: Red
        //     Arrays.asList(game.player2.x, game.player2.y, 2, 0x0000ff) // Player 2: Blue
        // );

        // Send initial state to both players
        // sendToPlayer(game.player1, "i", Map.of("id", 1, "p", playersData));
        // sendToPlayer(game.player2, "i", Map.of("id", 2, "p", playersData));

        sendToPlayer(game.player1, "m", true);
        sendToPlayer(game.player2, "m",true);

        //Start game timer that runs every second
        game.timerTask = scheduler.scheduleAtFixedRate(() -> {
            gameLoop(game);
        }, 0, 1, TimeUnit.SECONDS);

        // Spawn first collectible square
        // spawnSquare(game);
    }

    /**
     * Main game loop that runs every second.
     * Updates timer and spawns new squares every 10 seconds.
     * Message format 't': Time update
     */
    private void gameLoop(Game game) {
        game.timeLeft--;

        // Update time for both players
        // sendToPlayer(game.player1, "t", game.timeLeft);
        // sendToPlayer(game.player2, "t", game.timeLeft);

        // Spawn new square every 10 seconds
        /*
        if (game.timeLeft % 5 == 0) {
            spawnSquare(game);
        }
        */

        // End game when time runs out
        if (game.timeLeft <= 0) {
            //endGame(game);
        }
    }

    /**
     * Creates and sends a new collectible square to both players.
     * Message format 's': Square position [x, y]
     */
    // private void spawnSquare(Game game) {
    //     game.square = new Square();
    //     sendToPlayer(game.player1, "s", Arrays.asList(game.square.x, game.square.y));
    //     sendToPlayer(game.player2, "s", Arrays.asList(game.square.x, game.square.y));
    // }

    private void enviarSeleccion(Player player, String type, Object data)
    {
        try {
            String message = type;
            if (data != null) {
                message += mapper.writeValueAsString(data);
            }
            synchronized (player.session) {
                player.session.sendMessage(new TextMessage(message));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Handles incoming WebSocket messages from players.
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {


        Game game = games.get(session.getId());

        if (game == null) return;

        Player currentPlayer = players.get(session.getId());
        Player otherPlayer = game.player1 == currentPlayer ? game.player2 : game.player1;

        String payload = message.getPayload();
        char type = payload.charAt(0);
        String data = payload.length() > 1 ? payload.substring(1) : "";

        if(type=='X'){
            sendToPlayer(otherPlayer,payload);//avisar al otro que la partida terminó
            endGame(game);
        }
        else if(type=='s'){
            if(data == "1")
            {
                currentPlayer.seleccion = 1;
            }
            else if(data == "2")
            {
                currentPlayer.seleccion = 2;
            }
            else
            {
                currentPlayer.seleccion = 0;
            }
            
            enviarSeleccion(otherPlayer, "s", data);
        }
        else if(type=='n')
        {
            if(currentPlayer.seleccion == 0 && otherPlayer.seleccion == 0)
            {
                if(game.player1.playerId == currentPlayer.playerId)
                {
                    boolean r =Math.random() <= 0.5;
                    String seleccion, s;
                    if(r)
                    {
                        seleccion = "1";
                        s = "2";
                    }
                    else
                    {
                        s = "1";
                        seleccion = "2";
                    }
                    System.out.println("He entrado una vez");
                    enviarSeleccion(currentPlayer, "n", s);
                    enviarSeleccion(otherPlayer, "n", seleccion);
                }
            }
            else if(currentPlayer.seleccion == 0)
            {
                if(otherPlayer.seleccion == 1)
                {
                    enviarSeleccion(currentPlayer, "n", "2");
                }
                else
                {
                    enviarSeleccion(currentPlayer, "n", "1");
                }
            }                                                   
        }
        else{
            sendToPlayer(otherPlayer,payload);
        }
    }

    /**
     * Ends the game by sending final scores and cleaning up game resources.
     * Message format 'o': Game over with final scores [player1Score, player2Score]
     */
    private void endGame(Game game) {
        // Send final scores to both players
       // List<Integer> finalScores = Arrays.asList(game.player1.score, game.player2.score);

        // if (this.players.containsKey(game.player1.session.getId())) {
        //     sendToPlayer(game.player1, "o", finalScores);
        // }

        // if (this.players.containsKey(game.player2.session.getId())) {
        //     sendToPlayer(game.player2, "o", finalScores);
        // }

        // Cancel timer and cleanup game resources
        if (game.timerTask != null) {
            game.timerTask.cancel(false);
        }

        games.remove(game.player1.session.getId());
        games.remove(game.player2.session.getId());
    }

    /**
     * Handles WebSocket connection closures by cleaning up player and game
     * resources.
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        players.remove(session.getId());
        waitingPlayers.remove(session);

        Game game = games.remove(session.getId());
        if (game != null) {
            endGame(game);
        }

    }

    /**
     * Sends a message to a specific player with the given type and data.
     * Messages are formatted as: type + JSON data
     * 
     * @param player The target player
     * @param type   Single character message type
     * @param data   Data to be JSON serialized (can be null)
     */
    private void sendToPlayer(Player player, String type, Object data) {
        try {
            String message = type;
            if (data != null) {
                message += mapper.writeValueAsString(data);
            }
            synchronized (player.session) {
                player.session.sendMessage(new TextMessage(message));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void sendToPlayer(Player player,String message){
        try {
            synchronized (player.session) {
                player.session.sendMessage(new TextMessage(message));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}