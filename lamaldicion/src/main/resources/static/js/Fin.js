class Fin extends Phaser.Scene
{
    constructor()
    {
        super({ key: "Fin"});
    }

    preload()
    {
        this.load.image("botonRegresar", "imagenes/botonRegresar.png");
    }

    create()
    {
        this.add.text(270, 370, "Continuará", { fontFamily: "sans-serif", fontSize: "150px", color: "#FFFFFF" });
    
        const botonVolver = this.add.image(640, 800, "botonRegresar")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("Fin");
                this.scene.start("MenuInicio");
            });
    }

    update()
    {

    }
}