class SeleccionarPersonaje extends Phaser.Scene
{
    constructor()
    {
        super({ key: "SeleccionarPersonaje"});
    }

    preload()
    {
        this.load.html('seleccion', 'html/seleccion.html');

        this.load.image("fondoCastilloSelect", "imagenes/MENU_PAUSA.png");
        this.load.image("imgHumano", "imagenes/HUMANO.png");
        this.load.image("imgFantasma", "imagenes/FANTASMA.png");
        this.load.image("fondoTiempo", "imagenes/fondoAvisos.png");
    }

    create()
    {
        this.add.image(1280/2, 900/2, "fondoCastilloSelect").setScale(0.45);

        this.seleccion = 0; //0-Nada 1-Humano 2-Fantasma
        this.seleccionRecibida = 0;

        this.socket = this.scene.get('Musica').getSocket();
        this.setupWebSocket();

        this.t_EnvioControl=0;
        this.frec_EnvioControl=3000;//milisegundos

        this.add.image(100, 65, "fondoTiempo").setScale(0.3);
        this.timeText = this.add.text(25, 50, 'Tiempo: 15', { fontSize: '32px', fill: '#000000' });
        this.time = 15;
        this.timeM = this.time * 1000;

        this.add.image(400, 425, "imgHumano");
        this.add.image(885, 425, "imgFantasma");

        const dom = this.add.dom(590, 400).createFromCache('seleccion');
        var juanito = this;
        dom.addListener("click");

        dom.on("click", function (event)
        {
            if(event.target.name === "humano")
            {
                if(juanito.seleccion == 1)
                {
                    juanito.seleccion = 0;
                    juanito.scene.get('Musica').setEsHumano(false);
                    juanito.enviarSeleccion();

                    this.scene.avisoDejarHumano();
                }
                else
                {
                    if(juanito.seleccionRecibida != 1)
                    {
                        juanito.seleccion = 1;
                        juanito.scene.get('Musica').setEsHumano(true);
                        juanito.enviarSeleccion();
    
                        juanito.avisoSiHumano();
                    }
                    else
                    {
                        juanito.avisoNoPersonaje();                    
                    }
                }                                
            }
            else if(event.target.name === "fantasma")
            {
                if(juanito.seleccion == 2)
                {
                    juanito.seleccion = 0;
                    juanito.scene.get('Musica').setEsHumano(false);
                    juanito.enviarSeleccion();

                    this.scene.avisoDejarFantasma();
                }
                else
                {
                    if(juanito.seleccionRecibida != 2)
                    {
                        juanito.seleccion = 2;
                        juanito.scene.get('Musica').setEsHumano(false);
                        juanito.enviarSeleccion();
                        juanito.avisoSiFantasma();
                    }
                    else
                    {
                        juanito.avisoNoPersonaje();                    
                    } 
                }
                              
            }
        });
    }

    avisoSiHumano()
    {
        const aviso7 = this.add.image(650, 450, "fondoTiempo").setScale(0.7); // imagen de confirmación registro
        const textAviso7 = this.add.text(460, 410, "El personaje del humano ha sido seleccionado.", {font: '21px Sans Serif',
        fill: '#000000'});

        const boton7 = this.add.image(650, 480, "botonAviso").setScale(0.8)
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                aviso7.visible = false;
                textAviso7.visible = false;
                boton7.visible = false;
                textBoton7.visible = false;
            }); 
            
        const textBoton7 = this.add.text(626, 465, "Vale", {font: '25px Sans Serif', fill: '#000000'});
    }

    avisoDejarHumano()
    {
        const aviso8 = this.add.image(650, 450, "fondoTiempo").setScale(0.7); // imagen de confirmación registro
        const textAviso8 = this.add.text(460, 410, "Has deseleccionado al personaje del humano.", {font: '21px Sans Serif',
        fill: '#000000'});

        const boton8 = this.add.image(650, 480, "botonAviso").setScale(0.8)
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                aviso8.visible = false;
                textAviso8.visible = false;
                boton8.visible = false;
                textBoton8.visible = false;
            }); 
            
        const textBoton8 = this.add.text(626, 465, "Vale", {font: '25px Sans Serif', fill: '#000000'});
    }

    avisoSiFantasma()
    {
        const aviso10 = this.add.image(650, 450, "fondoTiempo").setScale(0.7); // imagen de confirmación registro
        const textAviso10 = this.add.text(460, 410, "El personaje del fantasma ha sido seleccionado.", {font: '21px Sans Serif',
        fill: '#000000'});

        const boton10 = this.add.image(650, 480, "botonAviso").setScale(0.8)
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                aviso10.visible = false;
                textAviso10.visible = false;
                boton10.visible = false;
                textBoton10.visible = false;
            }); 
            
        const textBoton10 = this.add.text(626, 465, "Vale", {font: '25px Sans Serif', fill: '#000000'});
    }

    avisoDejarFantasma()
    {
        const aviso11 = this.add.image(650, 450, "fondoTiempo").setScale(0.7); // imagen de confirmación registro
        const textAviso11 = this.add.text(460, 410, "Has deseleccionado al personaje del fantasma.", {font: '21px Sans Serif',
        fill: '#000000'});

        const boton11 = this.add.image(650, 480, "botonAviso").setScale(0.8)
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                aviso11.visible = false;
                textAviso11.visible = false;
                boton11.visible = false;
                textBoton11.visible = false;
            }); 
            
        const textBoton11 = this.add.text(626, 465, "Vale", {font: '25px Sans Serif', fill: '#000000'});
    }

    avisoNoPersonaje()
    {
        const aviso9 = this.add.image(650, 450, "fondoTiempo").setScale(0.7); // imagen de confirmación registro
        const textAviso9 = this.add.text(460, 410, "Este personaje ya ha sido seleccionado por otro jugador.", {font: '21px Sans Serif',
        fill: '#000000'});

        const boton9 = this.add.image(650, 480, "botonAviso").setScale(0.8)
            .setInteractive()
            .on("pointerdown", () => {
                //this.sound.play("clic");
                aviso9.visible = false;
                textAviso9.visible = false;
                boton9.visible = false;
                textBoton9.visible = false;
            }); 
            
        const textBoton9 = this.add.text(626, 465, "Vale", {font: '25px Sans Serif', fill: '#000000'});
    }

    update(_,deltaTime)
    {
        this.t_EnvioControl+=deltaTime;
        // this.timeM -= deltaTime; borrado
        // console.log(this.timeM);

        // Puesto por mi
        if (this.time > 0)
        {
            this.time -= deltaTime / 1000;
            this.updateTimer();
        }

        if(this.t_EnvioControl>this.frec_EnvioControl){
            this.t_EnvioControl=0;

            this.envioDatosControl();
        }

        if(this.time <= 0)
        {
            this.scene.stop("SeleccionarPersonaje");
            this.scene.start("PrimerNivel");
            if(this.seleccion == 0)
            {
                this.sendMessage('n', null);
            }
        }
        /* borrado
        else if(this.timeM % 1000 <= 15)
        {
            this.time--;
            this.updateTimer();
        }*/
    }

    updateTimer() {
        this.timeText.setText(`Tiempo: ${Math.ceil(this.time)}`);
    }

    setupWebSocket() {
        this.socket.onopen = () => {
            console.log('Connected to server');
        };

        this.socket.onmessage = (event) => {
            const type = event.data.charAt(0); //la primera letra del mensaje es su tipo
            const data = event.data.length > 1 ? JSON.parse(event.data.substring(1)) : null;
            //mete en data el resto del mensaje, lo pasa de string a JSON

            switch(type) 
            {
                case 'm':
                    this.scene.stop("PantallaDeEspera");
                    this.scene.start("SeleccionarPersonaje");
                    break;
                case 's':
                    this.seleccionRecibida = data;
                    if(this.seleccion == this.seleccionRecibida)
                    {
                        this.seleccionRecibida = 0;
                        
                    }
                    console.log("CLIENTE: " + this.seleccion + " RECIBIDA: " + this.seleccionRecibida);
                    break;
                case 'n':
                    this.seleccion = data;
                    console.log("Hola");
                    if(this.seleccion == 1)
                    {
                        this.scene.get('Musica').setEsHumano(true);
                    }
                    else
                    {
                        this.scene.get('Musica').setEsHumano(false);
                    }
                    break;
                case 't':
                    this.time = data.time;
                    this.updateTimer();
                
                console.log("CLIENTE: " + this.seleccion + " RECIBIDA: " + this.seleccionRecibida);
                break;
            }
        };

        this.socket.onclose = () => {
            conseole.log('Disconected from server');
        };
    }

    enviarSeleccion()
    {
        this.sendMessage('s',this.seleccion);
    }

    envioDatosControl(){ //asegura de vez en cuando que todo este en su sitio :=)
        this.enviarSeleccion();
    }

    sendMessage(type, data = null) {
        if (this.socket.readyState === WebSocket.OPEN) {
            if (data) {
                this.socket.send(`${type}${JSON.stringify(data)}`);
            } else {
                this.socket.send(type);
            }
        }
    }
}