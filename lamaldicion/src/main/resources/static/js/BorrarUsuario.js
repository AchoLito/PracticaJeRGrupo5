class BorrarUsuario extends Phaser.Scene
{
    constructor()
    {
        super({ key: "BorrarUsuario" });
    }

    preload()
    {
        this.load.html("borrar", "html/BorrarUsuario.html");
        this.load.image("fondoCastillo", "imagenes/MENU_PAUSA.png");
        this.load.image("fondoAvisos", "imagenes/fondoAvisos.png");
        this.load.image("botonVolver", "imagenes/BotonVolver.png");
        this.load.audio("clic", "audio/clic.mp3");
    }

    create()
    {
        this.add.image(1280/2, 900/2, "fondoCastillo").setScale(0.45);
        this.add.image(640, 450, "fondoAvisos").setScale(0.6);
        this.add.text(450, 410, "¿Estás seguro de que quieres borrar tu usuario?", {font: '21px Sans Serif',
            fill: '#000000'});

        //const text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        this.baseUrl = `${window.location.origin}/api/users`;
        //const users = this.cache.json.get("data/acho.json");
        const formulario = this.add.dom(590, 400).createFromCache('borrar');
        const scene = this.scene;
        var nombreInput = this.scene.get('Musica').getUsuario();
        console.log(formulario);
        //console.log(users);
        formulario.addListener("click");

        formulario.on("click", function (event)
        {
            if (event.target.name === "botonDelete"){

                this.scene.deleteUserServer(nombreInput);
            }
            
            if (event.target.name === "botonNo")
            {
                this.scene.stopEscena("MenuAjustes");
            }
        });

        this.tweens.add({
            targets: formulario,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });      
    }

    deleteUserServer(username)
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

    stopEscena(escenaAnterior)
    {
        this.scene.stop("BorrarUsuario");
        this.scene.start(escenaAnterior);
    }

    update()
    {

    }
}