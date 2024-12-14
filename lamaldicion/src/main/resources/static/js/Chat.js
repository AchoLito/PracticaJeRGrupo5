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
        
        this.FondoChat = this.add.image(0, 0, 'CHAT_Fondo');
    }
    
    update()
    {

    }
    
}
