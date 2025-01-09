class Derrota extends Phaser.Scene
{
    constructor()
    {
        super({ key: "Derrota"});
    }

    preload()
    {
        // Hay que añadir la ruta a los archivos 
        this.load.audio("clic", "audio/clic.mp3"); // sonido pulsar botón
      
        this.load.image("Fondo_menu_derrota", "imagenes/MENU_PAUSA.png"); 
        
        this.load.image("botonVolverMenuPrincipal", "imagenes/BOTON_MENU_INICIAL.png"); // imagen del botón de menu principal

        this.load.image("TituloDeLaPantallaDerrota", "imagenes/TITULO_PANTALLA_DERROTA.png");
       
    }

    create()
    {
        this.add.image(1280/2,900/2,'Fondo_menu_derrota').setScale(0.45);

        const titulo = this.add.image(640, 190, "TituloDeLaPantallaDerrota").setScale(0.4);

        const botonMenuPrincipal = this.add.image(640, 690, "botonVolverMenuPrincipal")
        .setInteractive()
        .on("pointerdown", () => {
            this.sound.play("clic");
            this.scene.start("MenuInicio");
            this.scene.stop("Derrota");
            this.scene.stop("PrimerNivel");

        });


    }

}
