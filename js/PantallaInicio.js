class PantallaInicio extends Phaser.Scene
{
    constructor()
    {
        super({ key: "PantallaInicio"});
    }

    preload()
    {
        // Hay que añadir la ruta a los archivos
        this.load.audio("clic"); // sonido pulsar botón
        this.load.audio("musicaInicio"); // sonido música fondo 

        this.load.image("botonContinuar"); // imagen del botón de continuar
    }

    create()
    {
        this.musica = this.sound.add("musicaInicio");
        this.musica.loop = true;
        this.musica.play();

        const botonJugar = this.add.image("botonContinuar") // añadir en el paréntesis la posición en la que queremos la imagen
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("PantallaInicio");
                this.scene.start("MenuInicio");
            });
    }

    update()
    {

    }
}