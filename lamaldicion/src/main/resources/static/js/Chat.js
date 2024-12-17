class Chat extends Phaser.Scene
{
    constructor()
    {
        super({ key: "Chat"});
    }

    preload()
    {
        this.load.image('CHAT_Fondo', 'imagenes/chatFondo.png');
        this.load.audio("clic", "audio/clic.mp3"); // sonido pulsar botón

        this.load.html('DOM_CHAT', 'chat.html');
    }

    create()
    {

        

        this.scene.bringToTop('Chat');
        this.FondoChat = this.add.image(1010,445, 'CHAT_Fondo');
        this.BotonChat = this.add.image(70, 70, 'BOTON_CHAT').setScale(0.7,0.7)
        .setInteractive().on("pointerdown", () => {
            this.sound.play("clic");
            this.scene.resume("PrimerNivel");
            this.scene.stop("Chat");
        });
        
        this.input.keyboard.on('keydown-ENTER', () => { this.enviarMensaje();});
        
        this.events.on('shutdown', () => {
            this.input.keyboard.off('keydown-ENTER'); // Eliminar el listener
        });


        this.baseUrl = `${window.location.origin}/api/chat`;
        this.domChat = this.add.dom(1010, 445).createFromCache('DOM_CHAT');

        // Convertimos domChat a un objeto jQuery
        this. $domChat = $(this.domChat.node);
        this.inputChat = this.$domChat.find('#Input');
        this.historialMensajes = this.$domChat.find('#Historial');

        

        this.domChat.addListener('click');
        this.domChat.on('click',  (event)=>
        {
            if (event.target.name === 'Enviar')//cuando haces click en el boton de enviar de chat.html
            {
                this.enviarMensaje();
            }
        });
        
        

        this.t=0;
        

        this.intervaloActualizaciones=2000;//en milisegundos
        this.lastTimestamp = new Date(); 

        this.id=0;

        this.cargarMensajes();
    }
    
    update(_,deltaTime)
    {
        this.t += deltaTime;

        if(this.t>this.intervaloActualizaciones){
            this.t=0;

            this.cargarMensajes();
        }

    }
      
    cargarMensajes() {
        const self=this;
        $.get(this.baseUrl, { since: this.id },  (data)=> {
            if ( data.length > 0) 
            {
                data.forEach(msg => {
                    
                    self.historialMensajes.append(`<div>${msg.user}:  ${msg.text}</div>`);
                    self.id++;
                });
                
                self.historialMensajes.scrollTop(self.historialMensajes.prop('scrollHeight')); // Scroll to the bottom
                self.lastTimestamp = data.timestamp; // Update last timestamp
            }
        });

        
    }
 
    
    enviarMensaje() 
    {

        

        if (!this.inputChat.val().trim()) return;

        const mensaje = this.inputChat.val();
        
        // Crear objeto JSON tipo ChatRequest
        const datosMensaje = {
            user: "juan",
            message: mensaje,
            timestamp: this.lastTimestamp
        };

        // Enviar solicitud POST con JSON
        $.ajax({
            url: this.baseUrl, // URL del servidor
            type: "POST", // Método HTTP
            data: JSON.stringify(datosMensaje), // Convertir a JSON
            contentType: "application/json", // Especificar Content-Type
            success:  ()=> {
                this.inputChat.val(''); // Limpiar input
                this.cargarMensajes(); // Fetch new messages
            },
            error: function (error) {
                console.error("Error al enviar mensaje:", error);
            }
        });
    }
    
}
