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


        this.baseUrl = `${window.location.origin}/api/chat`;
        this.domChat = this.add.dom(400, 600).createFromCache('DOM_CHAT');
        // Convertimos domChat a un objeto jQuery
        this. $domChat = $(this.domChat.node);
        this. input = this.$domChat.find('#Input');
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
        this.lastTimestamp = 0; 
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
        $.get(this.baseUrl, { since: this.lastTimestamp }, function (data) {
            if (data.filteredMessages && data.filteredMessages.length > 0) {
                data.filteredMessages.forEach(msg => {
                    this.historialMensajes.append(`<div>${msg}</div>`);
                });
                this.historialMensajes.scrollTop(chatBox.prop('scrollHeight')); // Scroll to the bottom
                this.lastTimestamp = data.timestamp; // Update last timestamp
            }
        });
    }
 
    
    enviarMensaje() {
    const mensaje = this.input.val().trim();
    if (!mensaje) return;

    console.log(mensaje);
    
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
            console.log("Mensaje Enviado");
            this.input.val(''); // Limpiar input
            cargarMensajes(); // Fetch new messages
        },
        error: function (error) {
            console.error("Error al enviar mensaje:", error);
        }
    });
}
    
}
