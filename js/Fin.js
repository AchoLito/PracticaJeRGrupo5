class Fin extends Phaser.Scene
{
    constructor()
    {
        super({ key: "Fin"});
    }

    preload()
    {
        
    }

    create()
    {
        this.add.text(270, 370, "Continuará", { fontFamily: "sans-serif", fontSize: "150px", color: "#FFFFFF" });
    }

    update()
    {

    }
}