class Creditos extends Phaser.Scene
{
    constructor()
    {
        super({ key: "Creditos" });
    }

    preload()
    {
        this.load.audio("clic", "audio/clic.mp3");

        this.load.image("volver", "imagenes/BotonVolver.png"); // imagen boton volver
    }

    create()
    {
        const botonVolver = this.add.image(75, 75, "volver")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("Creditos");
                this.scene.start("MenuInicio");
            });

        // Cambiar nombres de las variables por las categorías que usemos
        // y añadir más textos para los nombres de cada uno
        const interfaces = this.add.text(150, 120, "Diseño e implementación de interfaces", { fontFamily: "serif-sans", fontSize: "35px", color: "#FFFFFF" });

        const AnaInter = this.add.text(220, 185, "Ana María Caamaño del Amo", { fontFamily: "serif-sans", fontSize: "30px", color: "#FFFFFF" })
        
        const programacion = this.add.text(480, 330, "Implementación de escenas", { fontFamily: "serif-sans", fontSize: "35px", color: "#FFFFFF" });

        const AnaPro = this.add.text(490, 395, "Ana María Caamaño del Amo", { fontFamily: "serif-sans", fontSize: "30px", color: "#FFFFFF" });
        const UnaiPro = this.add.text(550, 430, "Unai Pastrana Torres", { fontFamily: "serif-sans", fontSize: "30px", color: "#FFFFFF" });
        const JaviPro = this.add.text(548, 465, "Javier Martín Mulero", { fontFamily: "serif-sans", fontSize: "30px", color: "#FFFFFF" });
        const LaraPro = this.add.text(560, 500, "Lara Sánchez Sanz", { fontFamily: "serif-sans", fontSize: "30px", color: "#FFFFFF" });
        const JesusPro = this.add.text(550, 535, "Jesús Mercado Rioja", { fontFamily: "serif-sans", fontSize: "30px", color: "#FFFFFF" });
        
        const dialogos = this.add.text(850, 120, "Historia y diálogos", { fontFamily: "serif-sans", fontSize: "35px", color: "#FFFFFF" });
        
        const LaraDia = this.add.text(870, 185, "Lara Sánchez Sanz", { fontFamily: "serif-sans", fontSize: "30px", color: "#FFFFFF" });    

        const sonido = this.add.text(250, 650, "SFX y música", { fontFamily: "serif-sans", fontSize: "35px", color: "#FFFFFF" });

        const AnaSon = this.add.text(175, 715, "Ana María Caamaño del Amo", { fontFamily: "serif-sans", fontSize: "30px", color: "#FFFFFF" });
    
        const arte = this.add.text(950, 650, "Arte", { fontFamily: "serif-sans", fontSize: "35px", color: "#FFFFFF" });    
    
        const UnaiArte = this.add.text(865, 715, "Unai Pastrana Torres", { fontFamily: "serif-sans", fontSize: "30px", color: "#FFFFFF" });
        const JesusArte = this.add.text(865, 750, "Jesús Mercado Rioja", { fontFamily: "serif-sans", fontSize: "30px", color: "#FFFFFF" });
    }

    update()
    {

    }
}