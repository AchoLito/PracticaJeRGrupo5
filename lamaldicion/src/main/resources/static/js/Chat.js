class Chat extends Phaser.Scene
{
    constructor()
    {
        super({ key: "Chat"});
    }

    preload()
    {
        this.load.image('CHAT_Fondo', 'imagenes/chatFondo.png');
    }

    create()
    {
        
        this.FondoChat = this.add.image(1010,445, 'CHAT_Fondo');

        this.BotonChat = this.add.image(70, 70, 'BOTON_CHAT').setScale(0.7,0.7)
        .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                
                console.log("cerral");
                //cerramos chat
                this.scene.resume("PrimerNivel");
                this.scene.stop("Chat");
                
            });
    }
    
    update()
    {

    }
    
}
