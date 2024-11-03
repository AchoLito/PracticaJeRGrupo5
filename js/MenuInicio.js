class MenuInicio extends Phaser.Scene
{
    constructor()
    {
        super({ key: "MenuInicio"});
    }

    preload()
    {
        // Hay que añadir la ruta a los archivos 
        this.load.audio("clic"); // sonido pulsar botón
        this.load.audio("musicaMenu"); // sonido música fondo menú

        this.load.image("tituloJuego");
        this.load.image("botonJugar"); // imagen del botón de jugar
        this.load.image("botonAjustes"); // imagen del botón de ajustes
        this.load.image("botonControles"); // imagen del botón de controles
    }

    create()
    {
        this.musica = this.sound.add("musicaMenu");
        this.musica.loop = true;
        this.musica.play();

        const tituloJuego = this.add.image("tituloJuego");

        const botonJugar = this.add.image("botonJugar") // añadir en el paréntesis la posición en la que queremos la imagen
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuInicio");
                this.scene.start("Historia");
            });

        const botonAjustes = this.add.image("botonAjustes")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuInicio");
                this.scene.start("MenuAjustes");
            });

        const botonSalir = this.add.image("botonControles")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuInicio");
                this.scene.start("Controles");
            })
    }

    update()
    {

    }
}