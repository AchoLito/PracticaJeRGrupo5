class SeleccionarPersonaje extends Phaser.Scene
{
    constructor()
    {
        super({ key: "SeleccionarPersonaje"});
    }

    preload()
    {
        this.load.html('seleccion', 'html/seleccion.html');
    }

    create()
    {
        this.seleccion = 0; //0-Nada 1-Humano 2-Fantasma
        this.seleccionRecibida = 0;

        this.socket = this.scene.get('Musica').getSocket();
        this.setupWebSocket();

        this.t_EnvioControl=0;
        this.frec_EnvioControl=3000;//milisegundos

        this.timeText = this.add.text(16, 50, 'Time: 15', { fontSize: '32px', fill: '#fff' });
        this.time = 15;
        this.timeM = this.time * 1000;

        const dom = this.add.dom(590, 400).createFromCache('seleccion');
        var juanito = this;
        dom.addListener("click");

        dom.on("click", function (event)
        {
            if(event.target.name === "humano")
            {
                if(juanito.seleccionRecibida != 1)
                {
                    juanito.seleccion = 1;
                    juanito.scene.get('Musica').setEsHumano(true);
                    juanito.enviarSeleccion();
                }
                
            }
            else if(event.target.name === "fantasma")
            {
                if(juanito.seleccionRecibida != 2)
                {
                    juanito.seleccion = 2;
                    juanito.scene.get('Musica').setEsHumano(false);
                    juanito.enviarSeleccion();
                }
            }
        });
    }

    update(_,deltaTime)
    {
        this.t_EnvioControl+=deltaTime;
        this.timeM -= deltaTime;
        //console.log(this.timeM);

        if(this.t_EnvioControl>this.frec_EnvioControl){
            this.t_EnvioControl=0;

            this.envioDatosControl();
        }

        if(this.timeM <= 0)
        {
            this.scene.stop("SeleccionarPersonaje");
            this.scene.start("PrimerNivel");
            if(this.seleccion == 0)
            {
                this.sendMessage('n', null);
            }
        }
        else if(this.timeM % 1000 <= 15)
        {
            this.time--;
            this.updateTimer();
        }
    }

    updateTimer() {
        this.timeText.setText(`Time: ` + this.time);
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
                
                console.log("CLIENTE: " + this.seleccion + " RECIBIDA: " + this.seleccionRecibida);
                break;
            }
        };

        this.socket.onclose = () => {

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