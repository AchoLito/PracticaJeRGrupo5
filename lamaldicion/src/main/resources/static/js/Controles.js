class Controles extends Phaser.Scene
{
    constructor()
    {
        super({ key: "Controles"});
    }

    preload()
    {
        this.load.audio("clic", "audio/clic.mp3"); // sonido pulsar botón

        this.load.image("humano", "imagenes/HUMANO.png"); // imagen humano
        this.load.image("fantasma", "imagenes/FANTASMA.png"); // imagen fantasma
        this.load.image("botonVolver", "imagenes/BotonVolver.png"); // imagen del botón volver
        this.load.image("WASD", "imagenes/TeclasWASD.png"); // movimiento humano
        this.load.image("flechas", "imagenes/TeclasFlechas.png"); // movimiento fantasma
        this.load.image("TeclaE", "imagenes/TeclaE.png"); // interacción humano
        this.load.image("Intro", "imagenes/TeclaIntro.png"); // interacción fantasma 
        this.load.image("espacio", "imagenes/TeclaEspacio.png"); // tecla para pasar los diálogos
        this.load.image("teclasNum", "imagenes/botones_num.png")
    }

    create()
    {
        const humano = this.add.image(280, 180, "humano");

        const textHumano = this.add.text(220, 300, "Humano", { fontFamily: "serif-sans", fontSize: "40px", color: "#FFFFFF" });

        const fantasma = this.add.image(1100, 700, "fantasma");

        const textFantasma = this.add.text(1025, 800, "Fantasma", { fontFamily: "serif-sans", fontSize: "40px", color: "#FFFFFF" });

        const wasd = this.add.image(700, 200, "WASD");

        const textWASD = this.add.text(600, 300,"Movimiento", { fontFamily: "serif-sans", fontSize: "40px", color: "#FFFFFF" });

        const teclaE = this.add.image(1100, 200, "TeclaE");

        const textE = this.add.text(1020, 300,"Interactuar", { fontFamily: "serif-sans", fontSize: "40px", color: "#FFFFFF" });

        const flechas = this.add.image(700, 700, "flechas");

        const textFlechas = this.add.text(600, 800,"Movimiento", { fontFamily: "serif-sans", fontSize: "40px", color: "#FFFFFF" });

        const intro = this.add.image(300, 700, "Intro");

        const textIntro = this.add.text(220, 800,"Interactuar", { fontFamily: "serif-sans", fontSize: "40px", color: "#FFFFFF" });

        const espacio = this.add.image(1100, 480, "espacio");

        const dialogos = this.add.text(680, 455,"Pasar diálogos", { fontFamily: "serif-sans", fontSize: "40px", color: "#FFFFFF" });

        const teclasNum = this.add.image(480, 480, "teclasNum");

        const select = this.add.text(100, 440,"Seleccionar", { fontFamily: "serif-sans", fontSize: "40px", color: "#FFFFFF" });
    
        const inventario = this.add.text(100, 475,"inventario", { fontFamily: "serif-sans", fontSize: "40px", color: "#FFFFFF" });

        const botonVolver = this.add.image(75, 75, "botonVolver")
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