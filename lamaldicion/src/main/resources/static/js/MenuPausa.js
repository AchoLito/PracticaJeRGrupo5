class MenuPausa extends Phaser.Scene
{
    constructor()
    {
        super({ key: "MenuPausa"});
    }

    preload()
    {
        // Hay que añadir la ruta a los archivos 
        this.load.audio("clic", "audio/clic.mp3"); // sonido pulsar botón
      
        this.load.image("Fondo_menu_pausa", "imagenes/MENU_PAUSA.png"); 
        this.load.image("botonSeguirJugando", "imagenes/BOTON_REANUDAR.png"); // imagen del botón de reanudar
        this.load.image("botonMenuPrincipal", "imagenes/BOTON_MENU_INICIAL.png"); // imagen del botón de menu principal
        this.load.image("botonAjustesVolumen", "imagenes/BOTON_AJUSTES.png"); // imagen del botón de ajustes
    }

    create()
    {
        this.add.image(1280/2,900/2,'Fondo_menu_pausa').setScale(0.45);

        const botonJugar = this.add.image(640, 320, "botonSeguirJugando") // añadir en el paréntesis la posición en la que queremos la imagen
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.resume("PrimerNivel");
                this.scene.stop("MenuPausa");
                
            });

            const botonMenuPrincipal = this.add.image(640, 470, "botonMenuPrincipal")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.start("MenuInicio");
                this.scene.stop("MenuPausa");
                this.scene.stop("PrimerNivel");

            });

            
       const botonAjustes = this.add.image(640, 620, "botonAjustesVolumen")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.launch("MenuAjustes2");
                this.scene.stop("MenuPausa");
             
               
                
            });
            
       
    }

    update()
    {

    }
}