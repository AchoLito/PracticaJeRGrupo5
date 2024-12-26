class SeleccionarPersonaje extends Phaser.Scene
{
    constructor()
    {
        super({ key: "SeleccionarPersonaje"});
    }

    preload()
    {
  
    }

    create()
    {
        this.socket = new WebSocket("ws://" + location.host + "/ws");
        this.setupWebSocket();

        this.t_EnvioControl=0;
        this.frec_EnvioControl=3000;//milisegundos
    }

    update(_,deltaTime)
    {
        this.t_EnvioControl+=deltaTime;

        if(this.t_EnvioControl>this.frec_EnvioControl){
            this.t_EnvioControl=0;

            this.envioDatosControl();
        }
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
                case 'p':
                    if(this.esHumano)
                    {
                        //Marcar que ha cogido al humano
                    }
                    else
                    {
                        //Marcar que ha cogido al fantasma
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