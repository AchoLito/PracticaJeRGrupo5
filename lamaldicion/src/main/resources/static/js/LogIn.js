class LogIn extends Phaser.Scene
{
    constructor()
    {
        super({ key: "LogIn"});
    }

    preload()
    {       
        this.load.html("logIn", "html/logIn.html");
        this.load.json("acho", "data/acho.json");
    }

    create()
    {
        //const text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        const users = this.cache.json.get("acho",);
        const formulario = this.add.dom(590, 400).createFromCache('logIn');
        const nombreInputs = formulario.getChildByID("nombreUsuario");
        console.log(formulario);
        console.log(users.key);
        formulario.addListener("click");

        formulario.on("click", function (event)
        {
            if (event.target.name === "botonLogIn")
            {
                const nombreInput = formulario.getChildByID("nombreUsuario");
                const passwordInput = formulario.getChildByID("password");

                if (nombreInput.value !== "" && passwordInput.value !== "")
                {
                    //if (nombreInput.value === users.name && passwordInput.value === users.password)
                    if (users.find("Acho") && passwordInput.value === users.password)
                    {
                        formulario.removeListener("click");
                        console.log("hola");
                        this.scene.tweens.add({
                            targets: formulario, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                            onComplete: function ()
                            {
                                formulario.setVisible(false);
                            }
                        });
                        
                        this.scene.stop("LogIn");
                        this.scene.start("PantallaInicio");
                    }
                }
            }

        });

        this.tweens.add({
            targets: formulario,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });
    }
}