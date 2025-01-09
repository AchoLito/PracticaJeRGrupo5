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
                this.scene.pause("MenuAjustes2");
                this.scene.start("EditarContrasena2");
            });
        this.add.text(730, 475, "Editar contraseña", {font: '45px Cambria Math', fill: '#000000'});
        const fondoDelete = this.add.image(900, 650, "fondoBotonEdit")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuAjustes2");
                this.scene.start("BorrarUsuario2");
            });
        this.add.text(760, 625, "Borrar usuario", {font: '45px Cambria Math', fill: '#000000'});

        const controlVolumen = this.scene.get('Musica'); // Obtener la escena Musica

        let volumenActual = controlVolumen.getVolume();
     
        this.socket = this.scene.get('Musica').getSocket();
        this.setupWebSocket();

   

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

        const botonVolver = this.add.image(250, 75, "botonVolverAlJuego")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuAjustes2");
                this.scene.resume("PrimerNivel");
            });

    }

    setupWebSocket() {
        this.socket.onopen = () => {
            console.log('Connected to server');
        };

        this.socket.onmessage = (event) => {
            const type = event.data.charAt(0); //la primera letra del mensaje es su tipo
            //const data = event.data.length > 1 ? JSON.parse(event.data.substring(1)) : null;
            //mete en data el resto del mensaje, lo pasa de string a JSON

            switch(type) 
            {
                case 'R'://reanudar
                this.scene.resume("PrimerNivel");
                this.scene.get("PrimerNivel").reanudar();
                this.scene.stop("MenuAjustes2");
                break;
                case 'S':
                    this.scene.start("MenuInicio");
                    this.scene.stop("MenuPausa");
                    this.scene.stop("PrimerNivel");
                break;
            }
        };

        this.socket.onclose = () => {
            this.gameStarted = false;
        };
    }

    upload()
    {

    }
}