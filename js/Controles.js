class Controles extends Phaser.Scene
{
    constructor()
    {
        super({ key: "Controles"});
    }

    preload()
    {
        /*this.load.audio("clic"); // sonido pulsar botón
        this.load.audio("musicaMenu"); // sonido música fondo menú*/

        //this.load.image("humano"); // imagen humano
        this.load.image("fantasma", "imagenes/FANTASMA_DELANTE.png"); // imagen fantasma
        this.load.image("botonVolver", "imagenes/BotonVolver.png"); // imagen del botón volver
        this.load.image("WASD", "imagenes/TeclasWASD.png"); // movimiento humano
        this.load.image("flechas", "imagenes/TeclasFlechas.png"); // movimiento fantasma
        this.load.image("TeclaE", "imagenes/TeclaE.png"); // interacción humano
        this.load.image("Intro", "imagenes/TeclaIntro.png"); // interacción fantasma 
        this.load.image("espacio", "imagenes/TeclaEspacio.png"); // tecla para pasar los diálogos
    }

    create()
    {
        /*this.musica = this.sound.add("musicaMenu");
        this.musica.loop = true;
        this.musica.play();

        const humano = this.add.image("humano");*/

        //const textHumano = this.add.text("Humano");

        const fantasma = this.add.image(300, 700, "fantasma");

        //const textFantasma = this.add.text("Fantasma");

        const wasd = this.add.image(700, 200, "WASD");

        const teclaE = this.add.image(1100, 200, "TeclaE");

        const flechas = this.add.image(700, 700, "flechas");

        const intro = this.add.image(1100, 700, "Intro");

        const espacio = this.add.image(925, 450, "espacio");

        const botonVolver = this.add.image(75, 75, "botonVolver")
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                this.scene.stop("Controles");
                this.scene.start("MenuInicio");
            });
    }

    upload()
    {

    }
}