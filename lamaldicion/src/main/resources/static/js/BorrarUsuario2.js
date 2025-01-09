class BorrarUsuario2 extends Phaser.Scene
{
    constructor()
    {
        super({ key: "BorrarUsuario2" });
    }

    preload()
    {
        this.load.html("borrar2", "html/BorrarUsuario2.html");
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
        const formulario = this.add.dom(590, 400).createFromCache('borrar2');
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
                this.scene.stopEscena("MenuAjustes2");
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
                this.avisoUsuarioBorrado();
                console.log("Mensaje Enviado" + data);
            },
            error: () => {
                avisoUsuarioNoBorrado();
                console.error("Err or al enviar mensaje:", error);
            }
        });
    }

    avisoUsuarioBorrado()
    {
        const aviso12 = this.add.image(650, 620, "fondoAvisos").setScale(0.7); // imagen de confirmación registro
        const textAviso12 = this.add.text(500, 580, "El usuario ha sido borrado con éxito.", {font: '21px Sans Serif',
        fill: '#000000'});

        const boton12 = this.add.image(650, 650, "botonAviso").setScale(0.8)
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                this.scene.stop("BorrarUsuario2");
                this.scene.stop("PrimerNivel");
                this.scene.start("LogIn");
                aviso12.visible = false;
                textAviso12.visible = false;
                boton12.visible = false;
                textBoton12.visible = false;
            }); 
            
        const textBoton12 = this.add.text(626, 635, "Vale", {font: '25px Sans Serif', fill: '#000000'});
    }

    avisoUsuarioNoBorrado()
    {
        const aviso13 = this.add.image(650, 620, "fondoAvisos").setScale(0.7); // imagen de confirmación registro
        const textAviso13 = this.add.text(480, 580, "No se ha podido borrar el usuario, vuelva a intentarlo.", {font: '21px Sans Serif',
        fill: '#000000'});

        const boton13 = this.add.image(650, 650, "botonAviso").setScale(0.8)
            .setInteractive()
            .on("pointerdown", () => {
                this.sound.play("clic");
                aviso13.visible = false;
                textAviso13.visible = false;
                boton13.visible = false;
                textBoton13.visible = false;
            }); 
            
        const textBoton13 = this.add.text(626, 635, "Vale", {font: '25px Sans Serif', fill: '#000000'});
    }

    stopEscena(escenaAnterior)
    {
        this.scene.stop("BorrarUsuario2");
        this.scene.start(escenaAnterior);
    }

    update()
    {

    }
}