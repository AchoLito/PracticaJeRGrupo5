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
    }

    create()
    {
        this.add.image(1280/2, 900/2, "fondo").setScale(0.45);

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
            nombreInput = this.getChildByID("nombreUsuario");
            passwordInput = this.getChildByID("password");      

            if (event.target.name === "botonRegistrar") //Crea el usuario
            {
                
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
                this.scene.getUserServer(nombreInput.value, passwordInput.value, formulario, scene);
                this.scene.scene.get('Musica').setUsuario(nombreInput.value);
            }

            if(event.target.name === "botonDelete"){
                this.scene.deleteUserServer(nombreInput.value);
            }
            if(event.target.name === "botonEdit"){
                this.scene.updateUserServer(nombreInput.value, passwordInput.value);
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
            scene.start("MenuInicio");
        }
    }

    getUserServer(username, contrasena, formulario, scene)
    {
        /*
        console.log(`${username}`);
        console.log(this.baseUrl + `/${username}`);
        $.get(this.baseUrl, `/${username}`, function(data){
            //console.log("He obtenido el usuario: " + data.user.getName());
   
            var user = JSON.parse(data)
            console.log(user);
            console.log(user.name + " " + username + " " + user.password + " " + contrasena);
            console.log(user.name === username && user.password === contrasena);
            console.log(result);
            result = user.name === username && user.password === contrasena;
            return result;
        })
   */
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
                console.log("Mensaje Enviado" + data);
            },
            error: function (error) {
                console.error("Error al enviar mensaje:", error);
            }
        });
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