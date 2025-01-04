class MenuAjustes extends Phaser.Scene
{
    constructor()
    {
        super({ key: "MenuAjustes"});
    }

    preload()
    {
        this.load.image("Fondo_menu_ajustes", "imagenes/MENU_AJUSTES.png"); 
        this.load.audio("clic", "audio/clic.mp3"); // sonido pulsar botón

        this.load.image("botonVolver", "imagenes/BotonVolver.png"); // imagen del botón volver
        this.load.image("Simbolo_volumen", "imagenes/SIMBOLO_VOLUMEN.png"); // imagen del sibolo volumen
        this.load.image("botonMasVolumen", "imagenes/BOTON_SUBIR_VOLUMEN.png"); // imagen del botón para subir el volumen
        this.load.image("botonMenosVolumen", "imagenes/BOTON_BAJAR_VOLUMEN.png"); // imagen del botón para bajar el volumen
        this.load.image("tituloMenu", "imagenes/AJUSTES.png"); // imagen del título de ajustes
        this.load.image("fondoBotonEdit", "imagenes/fondoBoton.png");
    }

    create()
    {
        this.add.image(1280/2,900/2,'Fondo_menu_ajustes').setScale(0.42);
        this.add.image(900,320,'Simbolo_volumen').setScale(0.2);
        this.add.image(900,150,'tituloMenu');
        const fondoEdit = this.add.image(900, 500, "fondoBotonEdit")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuAjustes");
                this.scene.start("EditarContrasena");
            });
        this.add.text(730, 475, "Editar contraseña", {font: '45px Cambria Math', fill: '#000000'});
        const fondoDelete = this.add.image(900, 650, "fondoBotonEdit")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuAjustes");
                this.scene.start("BorrarUsuario");
            });
        this.add.text(760, 625, "Borrar usuario", {font: '45px Cambria Math', fill: '#000000'});
        
        
        const controlVolumen = this.scene.get('Musica'); // Obtener la escena de audio

        let volumenActual = controlVolumen.getVolume();
     


   

        const subirVolumen = this.add.image(750, 320, "botonMenosVolumen").setScale(0.2)
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                volumenActual= Math.max(0, volumenActual - 0.1);
                controlVolumen.setVolume(volumenActual);
               
            });

            const bajarVolumen = this.add.image(1050, 320, "botonMasVolumen").setScale(0.2)
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                volumenActual= Math.min(1, volumenActual + 0.1);
                controlVolumen.setVolume(volumenActual);
            });

        const botonVolver = this.add.image(75, 75, "botonVolver")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuAjustes");
                this.scene.start("MenuInicio");
            });

    }

    upload()
    {

    }
}