class PantallaInicio extends Phaser.Scene
{
    constructor()
    {
        super({ key: "PantallaInicio"});
    }

    preload()
    {
        // Hay que añadir la ruta a los archivos
        //this.load.audio("clic"); // sonido pulsar botón
        //this.load.audio("musicaInicio"); // sonido música fondo 

        //this.load.image("fondo"); // imagen del fondo
        //this.load.image("tituloJuego"); // imagen con las letras del título
        this.load.image("botonContinuar", "imagenes/BotonContinuar.png"); // imagen del botón de continuar
    }

    create()
    {
        //this.musica = this.sound.add("musicaInicio");
        //this.musica.loop = true;
        //this.musica.play();

        //const fondo = this.add.image("fondo");

        //const titulo = this.add.image("tituloJuego");

        const botonJugar = this.add.image(640, 800, "botonContinuar") // añadir en el paréntesis la posición en la que queremos la imagen
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                this.scene.stop("PantallaInicio");
                this.scene.start("MenuInicio");
            });
    }

    update()
    {

    }
}