class MenuInicio extends Phaser.Scene
{
    constructor()
    {
        super({ key: "MenuInicio"});
    }

    preload()
    {
        // Hay que añadir la ruta a los archivos 
        this.load.audio("clic", "audio/clic.mp3"); // sonido pulsar botón
      
        this.load.image("Fondo_menu", "imagenes/FONDO_MENÚ_INICIO.png"); 
        this.load.image("botonJugar", "imagenes/BotonJugar.png"); // imagen del botón de jugar
        this.load.image("botonControles", "imagenes/BotonControles.png"); // imagen del botón de controles
        this.load.image("botonCreditos", "imagenes/BotonCreditos.png"); // imagen del botón de créditos
        this.load.image("botonAjustes", "imagenes/BOTON_AJUSTES.png"); // imagen del botón de créditos
    }

    create()
    {
        this.add.image(1280/2,900/2,'Fondo_menu');

        const botonJugar = this.add.image(640, 240, "botonJugar") // añadir en el paréntesis la posición en la que queremos la imagen
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuInicio");
                this.scene.start("SeleccionarPersonaje");
            });

        const botonControles = this.add.image(640, 390, "botonControles")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuInicio");
                this.scene.start("Controles");
            });
            
        const botonCreditos = this.add.image(640, 540, "botonCreditos")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuInicio");
                this.scene.start("Creditos");
            });

            const botonAjustes = this.add.image(640, 690, "botonAjustes")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("MenuInicio");
                this.scene.start("MenuAjustes");
            });
    }

    update()
    {

    }
}