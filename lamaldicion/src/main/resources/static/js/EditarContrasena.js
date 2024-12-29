class EditarContrasena extends Phaser.Scene
{
    constructor()
    {
        super({ key: "EditarContrasena"}); 
    }

    preload()
    {
        this.load.html("edit", "html/EditPassword.html");
        this.load.image("fondoCastillo", "imagenes/MENU_PAUSA.png");
        this.load.image("fondoEdit", "imagenes/fondoEdit.png");
        this.load.image("fondoSiEdit", "imagenes/fondoAvisos.png"); // imagen de confirmación registro
        this.load.image("botonAviso", "imagenes/botonAvisos.png");
        this.load.image("botonVolver", "imagenes/BotonVolver.png");
        this.load.audio("clic", "audio/clic.mp3");
    }

    
    create()
    {
        this.add.image(1280/2, 900/2, "fondoCastillo").setScale(0.45);
        this.add.image(640, 550, "fondoEdit").setScale(0.6);

        const botonVolver = this.add.image(75, 75, "botonVolver")
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("EditarContrasena");
                this.scene.start("MenuAjustes");
            });

        //const text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        this.baseUrl = `${window.location.origin}/api/users`;
        //const users = this.cache.json.get("data/acho.json");
        const formulario = this.add.dom(590, 400).createFromCache('edit');
        const scene = this.scene;
        var nombreInput = this.scene.get('Musica').getUsuario();
        var passwordInput = formulario.getChildByID("password");
        console.log(formulario);
        //console.log(users);
        formulario.addListener("click");

        formulario.on("click", function (event)
        {
            if (event.target.name === "botonEdit"){
                if (passwordInput.value !== "")
                {
                    this.scene.updateUserServer(nombreInput, passwordInput.value);
                }
                else
                {
                    this.scene.noPassword();
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

    noPassword()
    {
        const aviso5 = this.add.image(650, 620, "fondoSiEdit").setScale(0.7); // imagen de confirmación registro
        const textAviso5 = this.add.text(480, 580, "Por favor, introduzca la nueva contraseña.", {font: '21px Sans Serif',
        fill: '#000000'});

        const boton5 = this.add.image(650, 650, "botonAviso").setScale(0.8)
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                aviso5.visible = false;
                textAviso5.visible = false;
                boton5.visible = false;
                textBoton5.visible = false;
            }); 
            
        const textBoton5 = this.add.text(626, 635, "Vale", {font: '25px Sans Serif', fill: '#000000'});
        console.error('There has been a problem with your fetch operation:', error);
    }

    updateUserServer(username, contrasena)
    {
        console.log("He posteado el usuario:");
        const user = 
        {
            name: username,
            password: contrasena
        };

        console.log(user);
        $.ajax({
            url: this.baseUrl + `/${username}`, // URL del servidor
            type: "PUT", // Método HTTP
            data: JSON.stringify(user), // Convertir a JSON
            contentType: "application/json", // Especificar Content-Type
            success:  (data)=> {
                const aviso4 = this.add.image(650, 620, "fondoSiEdit").setScale(0.7); // imagen de confirmación registro
                const textAviso4 = this.add.text(480, 580, "La contraseña ha sido cambiada con éxito.", {font: '21px Sans Serif',
                fill: '#000000'});

                const boton4 = this.add.image(650, 650, "botonAviso").setScale(0.8)
                    .setInteractive()
                    .on("pointerdown", () => {
                        this.sound.play("clic");
                        aviso4.visible = false;
                        textAviso4.visible = false;
                        boton4.visible = false;
                        textBoton4.visible = false;
                    }); 
                    
                const textBoton4 = this.add.text(626, 635, "Vale", {font: '25px Sans Serif', fill: '#000000'});
                console.log("Mensaje Enviado" + data);
            },
            error: () => {
                const aviso6 = this.add.image(650, 620, "fondoSiEdit").setScale(0.7); // imagen de confirmación registro
                const textAviso6 = this.add.text(480, 580, "No se ha podido cambiar la contraseña, vuelva a intentarlo.", {font: '21px Sans Serif',
                fill: '#000000'});

                const boton6 = this.add.image(650, 650, "botonAviso").setScale(0.8)
                    .setInteractive()
                    .on("pointerdown", () => {
                        this.sound.play("clic");
                        aviso6.visible = false;
                        textAviso6.visible = false;
                        boton6.visible = false;
                        textBoton6.visible = false;
                    }); 
                    
                const textBoton6 = this.add.text(626, 635, "Vale", {font: '25px Sans Serif', fill: '#000000'});
            }
        });
    }

    update()
    {
        
    }
}