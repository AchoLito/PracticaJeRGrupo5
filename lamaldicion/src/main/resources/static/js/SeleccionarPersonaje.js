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

        this.socket = new WebSocket("ws://" + location.host + "/ws");
        this.setupWebSocket();

        this.t_EnvioControl=0;
        this.frec_EnvioControl=3000;//milisegundos

        const dom = this.add.dom(590, 400).createFromCache('seleccion');
        var humano = dom.getChildByID("humano");
        var fantasma = dom.getChildByID("fantasma");
        var juanito = this;
        dom.addListener("click");

        dom.on("click", function (event)
        {
            if(event.target.name === "humano")
            {
                this.seleccion = 1;
                juanito.scene.get('Musica').setEsHumano(this.seleccion);
                juanito.enviarSeleccion();
            }
            else if(event.target.name === "fantasma")
            {
                this.seleccion = 2;
                juanito.scene.get('Musica').setEsHumano(this.seleccion);
                juanito.enviarSeleccion();
            }
        });
    }

    update(_,deltaTime)
    {
        this.t_EnvioControl+=deltaTime;

        if(this.t_EnvioControl>this.frec_EnvioControl){
            this.t_EnvioControl=0;

            this.envioDatosControl();
        }
    }

    enviarSeleccion()
    {
        this.sendMessage('s',this.seleccion);
    }

    envioDatosControl(){ //asegura de vez en cuando que todo este en su sitio :=)
        this.enviarSeleccion();
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
                case 's':
                    this.seleccionRecibida = data;
                    if(this.seleccion == this.seleccionRecibida)
                    {
                        this.seleccionRecibida = 0;
                    }
                    break;
            }
        };

        this.socket.onclose = () => {

        };
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