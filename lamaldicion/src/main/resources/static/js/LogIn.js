class LogIn extends Phaser.Scene
{
    preload()
    {       
        this.load.html("logIn", "html/logIn.html");
        this.load.json("usuarios", "data/login.json");
    }

    create()
    {
        const users = this.cache.getJSON("usuarios");

        const formulario = this.add.dom(400, 400).createFromCache("logIn");

        formulario.addListener("click");

        formulario.on("click", function (event)
        {
            if (event.target.name === "botonLogIn")
            {
                const nombreInput = this.getChildByName("nombreUsuario");
                const passwordInput = this.getChildByName("password");

                if (nombreInput.value !== "" && passwordInput.value !== "")
                {
                    if (nombreInput.value === users.name && passwordInput.value === users.password)
                    {
                        this.removeListener("click");

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