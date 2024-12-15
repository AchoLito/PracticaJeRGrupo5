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
        const scene = this.scene;
        console.log(formulario);
        console.log(users[0].name);
        console.log(nombreInputs.value);
        formulario.addListener("click");

        formulario.on("click", function (event)
        {
            if (event.target.name === "botonLogIn")
            {
                const nombreInput = this.getChildByID("nombreUsuario");
                const passwordInput = this.getChildByID("password");               

                if (nombreInput.value !== "" && passwordInput.value !== "")
                {
                    //if (nombreInput.value === users.name && passwordInput.value === users.password)
                    console.log(this.scene.compruebaNombre(users, nombreInput.value) && this.scene.compruebaPassword(users, passwordInput.value));
                    if (this.scene.compruebaNombre(users, nombreInput.value) && this.scene.compruebaPassword(users, passwordInput.value))
                    {
                        this.removeListener("click");
                        console.log("hola");
                        this.scene.tweens.add({
                            targets: formulario, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                            onComplete: function ()
                            {
                                formulario.setVisible(false);
                            }
                        });
                        
                        scene.stop("LogIn");
                        scene.start("PantallaInicio");
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

    compruebaNombre(array, nombre)
    {
        for(var i = 0; i < array.length; i++)
        {
            console.log(nombre + " " + array[i].name);
            if(nombre == array[i].name)
            {
                return true;
            }
        }

        return false
    }

    compruebaPassword(array, password)
    {
        for(var i = 0; i < array.length; i++)
        {
            console.log(password + " " + array[i].password);
            if(password == array[i].password)
            {
                return true;
            }
        }

        return false;
    }
}