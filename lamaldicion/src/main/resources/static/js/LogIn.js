class LogIn extends Phaser.Scene
{
    constructor()
    {
        super({ key: "LogIn"});
    }

    preload()
    {       
        this.load.html("logIn", "html/logIn.html");
        //this.load.json("acho", "data/acho.json");

        this.load.image("fondo", "imagenes/MENU_PAUSA.png");  
        this.load.image("fondoRegistro", "imagenes/fondoRegistro.png");  
        this.load.image("fondoInicioSesion", "imagenes/fondoInicioSesion.png");   
        this.load.image("fondoSiRegistro", "imagenes/fondoAvisos.png"); // imagen de confirmación registro
        this.load.image("botonAviso", "imagenes/botonAvisos.png");
        //this.load.image(); // imagen no registro
        //this.load.image(); // imagen no inicio 
    }

    create()
    {
        this.add.image(1280/2, 900/2, "fondo").setScale(0.45);
        this.add.image(395, 400, "fondoRegistro").setScale(0.6);
        this.add.image(895, 400, "fondoInicioSesion").setScale(0.6);

        //this.add.image(650, 600, "fondoSiRegistro").setScale(0.7); // imagen de confirmación registro
        //this.add.text(310, 560, "El usuario que ha introducido ya existe, por favor introduzca un nombre distinto.", {font: '21px Sans Serif',
        //    fill: '#000000'});
        //this.add.image(); // imagen no registro
        //this.add.image(); // imagen no inicio

        //const text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        this.baseUrl = `${window.location.origin}/api/users`;
        //const users = this.cache.json.get("data/acho.json");
        const formulario = this.add.dom(590, 400).createFromCache('logIn');
        var nombreInput = formulario.getChildByID("nombreUsuario");
        var passwordInput = formulario.getChildByID("password");
        const scene = this.scene;
        console.log(formulario);
        //console.log(users);
        formulario.addListener("click");

        formulario.on("click", function (event)
        {
            if (event.target.name === "botonRegistrar") //Crea el usuario
            {
                nombreInput = this.getChildByID("nombreUsuario");
                passwordInput = this.getChildByID("password");  

                if (nombreInput.value !== "" && passwordInput.value !== "")
                {
                    //if (nombreInput.value === users.name && passwordInput.value === users.password)
                    //var cond = await this.scene.getUserServer(nombreInput.value, passwordInput.value);

                    //this.scene.getUserServer(nombreInput.value, passwordInput.value, formulario, scene);
                    this.scene.postUserServer(nombreInput.value, passwordInput.value);
                    
                    
                    /*
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
                        
                        
                    }   
                    */   
                   
                    
                }
            }

            if(event.target.name === "botonLogIn")//si el usuario existe y la contraseña exis
            {
                nombreInput = this.getChildByID("nombreUsuario1");
                passwordInput = this.getChildByID("password1");  

                this.scene.getUserServer(nombreInput.value, passwordInput.value, formulario, scene);
                this.scene.scene.get('Musica').setUsuario(nombreInput.value);
            }

            if(event.target.name === "botonDelete"){
                this.scene.deleteUserServer(nombreInput.value);
            }
        });

        this.tweens.add({
            targets: formulario,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });       
    }    

    compruebaUser(user, name, contrasena, formulario, scene)
    {
        if(user.name === name && user.password == contrasena)
        {
            formulario.removeListener("click");
            console.log(scene);
            
            scene.stop("LogIn");
            scene.start("PantallaInicio");
        }

        const aviso3 = this.add.image(650, 600, "fondoSiRegistro").setScale(0.7); // imagen de confirmación registro
        const textAviso3 = this.add.text(480, 560, "El usuario o la contraseña no son correctas.", {font: '21px Sans Serif',
        fill: '#000000'});

        const boton3 = this.add.image(650, 630, "botonAviso").setScale(0.8)
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                aviso3.visible = false;
                textAviso3.visible = false;
                boton3.visible = false;
                textBoton3.visible = false;
            }); 
            
        const textBoton3 = this.add.text(626, 615, "Vale", {font: '25px Sans Serif', fill: '#000000'});
    }

    getUserServer(username, contrasena, formulario, scene)
    {
        fetch(this.baseUrl + `/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }      
            
            return response.text();
        })
        .then(data => {
            console.log(data); // Aquí puedes manejar la respuesta del servidor
            var user = JSON.parse(data)
            console.log(contrasena + " " + formulario);
            this.compruebaUser(user, username, contrasena, formulario, scene);
        })
        .catch(error => {
            const aviso2 = this.add.image(650, 600, "fondoSiRegistro").setScale(0.7); // imagen de confirmación registro
            const textAviso2 = this.add.text(480, 560, "Este usuario no existe, por favor regístrese.", {font: '21px Sans Serif',
            fill: '#000000'});

            const boton2 = this.add.image(650, 630, "botonAviso").setScale(0.8)
                .setInteractive()
                .on("pointerdown", () => {
                    //this.sound.play("clic");
                    aviso2.visible = false;
                    textAviso2.visible = false;
                    boton2.visible = false;
                    textBoton2.visible = false;
                }); 
                
            const textBoton2 = this.add.text(626, 615, "Vale", {font: '25px Sans Serif', fill: '#000000'});
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    postUserServer(username, contrasena, formulario, scene)
    {
        console.log("He posteado el usuario:");
        const user = 
        {
            name: username,
            password: contrasena
        };
   
        console.log(user);
        $.ajax({
            url: this.baseUrl + `/`, // URL del servidor
            type: "POST", // Método HTTP
            data: JSON.stringify(user), // Convertir a JSON
            contentType: "application/json", // Especificar Content-Type
            success:  (data)=> {
                const aviso1 = this.add.image(650, 600, "fondoSiRegistro").setScale(0.7); // imagen de confirmación registro
                const textAviso1 = this.add.text(510, 560, "El usuario ha sido creado con éxito.", {font: '21px Sans Serif',
                fill: '#000000'});

                const boton1 = this.add.image(650, 630, "botonAviso").setScale(0.8)
                    .setInteractive()
                    .on("pointerdown", () => {
                        //this.sound.play("clic");
                        aviso1.visible = false;
                        textAviso1.visible = false;
                        boton1.visible = false;
                        textBoton1.visible = false;
                    }); 
                    
                const textBoton1 = this.add.text(626, 615, "Vale", {font: '25px Sans Serif', fill: '#000000'});    
                console.log("Mensaje Enviado" + data);
            },
            error: () => {
                const aviso = this.add.image(650, 600, "fondoSiRegistro").setScale(0.7); // imagen de confirmación registro
                const textAviso = this.add.text(310, 560, "El usuario que ha introducido ya existe, por favor introduzca un nombre distinto.", {font: '21px Sans Serif',
                fill: '#000000'});

                const boton = this.add.image(650, 630, "botonAviso").setScale(0.8)
                    .setInteractive()
                    .on("pointerdown", () => {
                        //this.sound.play("clic");
                        aviso.visible = false;
                        textAviso.visible = false;
                        boton.visible = false;
                        textBoton.visible = false;
                    }); 
                    
                const textBoton = this.add.text(626, 615, "Vale", {font: '25px Sans Serif', fill: '#000000'}); 
                console.error("Error al enviar mensaje:", error);
        }});
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
                console.log("Mensaje Enviado" + data);
            },
            error: function (error) {
                console.error("Error al enviar mensaje:", error);
            }
        });
    }
   
    deleteUserServer(username, contrasena, formulario, scene)
    {
        //console.log(user);
        $.ajax({
            url: this.baseUrl + `/${username}`, // URL del servidor
            type: "DELETE", // Método HTTP
            data: username, // Convertir a JSON
            contentType: "application/json", // Especificar Content-Type
            success:  (data)=> {
                console.log("Mensaje Enviado" + data);
            },
            error: function (error) {
                console.error("Err or al enviar mensaje:", error);
            }
        });
    }
}