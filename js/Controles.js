class Controles extends Phaser.Scene
{
    constructor()
    {
        super({ key: "Controles"});
    }

    preload()
    {
        this.load.audio("clic"); // sonido pulsar botón
        this.load.audio("musicaMenu"); // sonido música fondo menú

        this.load.image("humano"); // imagen humano
        this.load.image("fantasma"); // imagen fantasma
        this.load.image("botonVolver"); // imagen del botón volver
        this.load.image("WASD"); // movimiento humano
        this.load.image("flechas"); // movimiento fantasma
        this.load.image("TeclaE"); // interacción humano
        this.load.image("Intro"); // interacción fantasma 

        this.load.text("Controles"); // añadir delante la posición y detrás el tipo de fuente
        this.load.text("Humano"); 
        this.load.text("Fantasma");
    }

    create()
    {
        this.musica = this.sound.add("musicaMenu");
        this.musica.loop = true;
        this.musica.play();

        const humano = this.add.image("humano");

        const fantasma = this.add.image("fantasma");

        const wasd = this.add.image("WASD");

        const flechas = this.add.image("flechas");

        const teclaE = this.add.image("TeclaE");

        const intro = this.add.image("Intro");

        const botonVolver = this.add.image("botonVolver")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("Controles");
                this.scene.start("MenuInicio");
            });
    }

    upload()
    {

    }
}