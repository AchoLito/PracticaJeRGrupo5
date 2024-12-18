class PantallaInicio extends Phaser.Scene
{
    constructor()
    {
        super({ key: "PantallaInicio"});
    }

    preload()
    {
        // Hay que añadir la ruta a los archivos
        this.load.audio("clic", "audio/clic.mp3"); // sonido pulsar botón
        this.load.audio("musicaInicio", "audio/MusicaFondo.mp3"); // sonido música fondo 

        this.load.image("fondo2", "imagenes/FONDO_MENÚ_INICIO.png"); // imagen del fondo
        this.load.image("tituloJuego", "imagenes/TÍTULO.png"); // imagen con las letras del título
        this.load.image("botonContinuar", "imagenes/BotonContinuar.png"); // imagen del botón de continuar
    }

    create()
    {
        /*this.musica = this.sound.add("musicaInicio", { volume: 0.2 });
        this.musica.loop = true;
        this.musica.play();*/

        const fondo = this.add.image(640, 450, "fondo2");

        const titulo = this.add.image(500, 150, "tituloJuego");

        const botonJugar = this.add.image(640, 800, "botonContinuar") // añadir en el paréntesis la posición en la que queremos la imagen
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