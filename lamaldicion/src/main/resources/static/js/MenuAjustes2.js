class MenuAjustes2 extends Phaser.Scene
{
    constructor()
    {
        super({ key: "MenuAjustes2"});
    }

    preload()
    {
        this.load.image("Fondo_menu_ajustes", "imagenes/MENU_AJUSTES.png"); 
        this.load.audio("clic", "audio/clic.mp3"); // sonido pulsar botón

        this.load.image("botonVolverAlJuego", "imagenes/BOTON_REANUDAR.png"); // imagen del botón volver
        this.load.image("Simbolo_volumen", "imagenes/SIMBOLO_VOLUMEN.png"); // imagen del simbolo del volumen
        this.load.image("botonMasVolumen", "imagenes/BOTON_SUBIR_VOLUMEN.png"); // imagen del botón para subir el volumen
        this.load.image("botonMenosVolumen", "imagenes/BOTON_BAJAR_VOLUMEN.png"); // imagen del botón para bajar el volumen
        this.load.image("tituloMenu", "imagenes/AJUSTES.png"); // imagen del título de ajustes

    }

    create()
    {
        this.add.image(1280/2,900/2,'Fondo_menu_ajustes').setScale(0.42);
        this.add.image(900,470,'Simbolo_volumen').setScale(0.2);
        this.add.image(900,300,'tituloMenu');
        const controlVolumen = this.scene.get('Musica'); // Obtener la escena Musica

        let volumenActual = controlVolumen.getVolume();
     


   

        const subirVolumen = this.add.image(750, 470, "botonMenosVolumen").setScale(0.2)
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                volumenActual= Math.max(0, volumenActual - 0.1);
                controlVolumen.setVolume(volumenActual);
               
            });

            const bajarVolumen = this.add.image(1050, 470, "botonMasVolumen").setScale(0.2)
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                volumenActual= Math.min(1, volumenActual + 0.1);
                controlVolumen.setVolume(volumenActual);
            });

        const botonVolver = this.add.image(250, 75, "botonVolverAlJuego")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuAjustes2");
                this.scene.resume("PrimerNivel");
            });

    }

    upload()
    {

    }
}