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

        this.domChat = this.add.dom(400, 600).createFromCache('DOM_CHAT');

        this.domChat.addListener('click');
        this.domChat.on('click', function (event)
        {
            if (event.target.name === 'BotonEnviar')//cuando haces click en el boton de enviar de chat.html
            {
                const inputText = this.getChildByName('mensaje');//objeto input type text

                if (inputText.value !== '')
                {
                    console.log(inputText.value);
                }

                inputText.value='';//no se si funciona
            }
        });
    }
    
    update()
    {

    }
    
}
