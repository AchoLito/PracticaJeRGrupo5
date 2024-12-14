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
        
        this.FondoChat = this.add.image(1280/2,900/2, 'CHAT_Fondo');
    }
    
    update()
    {

    }
    
}
