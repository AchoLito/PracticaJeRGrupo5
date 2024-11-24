class MenuInicio extends Phaser.Scene
{
    constructor()
    {
        super({ key: "MenuInicio"});
    }

    preload()
    {
        // Hay que añadir la ruta a los archivos 
        //this.load.audio("clic"); // sonido pulsar botón
        //this.load.audio("musicaMenu"); // sonido música fondo menú

        //this.load.image("tituloJuego");
        this.load.image("botonJugar", "imagenes/BotonJugar.png"); // imagen del botón de jugar
        this.load.image("botonControles", "imagenes/BotonControles.png"); // imagen del botón de controles
        this.load.image("botonCreditos", "imagenes/BotonCreditos.png"); // imagen del botón de créditos
    }

    create()
    {
        /*this.musica = this.sound.add("musicaMenu");
        this.musica.loop = true;
        this.musica.play();

        const tituloJuego = this.add.image("tituloJuego");*/

        const botonJugar = this.add.image(640, 320, "botonJugar") // añadir en el paréntesis la posición en la que queremos la imagen
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                this.scene.stop("MenuInicio");
                this.scene.start("PrimerNivel");
            });

        const botonControles = this.add.image(640, 470, "botonControles")
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                this.scene.stop("MenuInicio");
                this.scene.start("Controles");
            });
            
        const botonCreditos = this.add.image(640, 620, "botonCreditos")
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                this.scene.stop("MenuInicio");
                this.scene.start("Creditos");
            });
    }

    update()
    {

    }
}