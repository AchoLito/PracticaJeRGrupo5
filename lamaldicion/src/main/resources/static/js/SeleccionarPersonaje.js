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
                    juanito.scene.get('Musica').setEsHumano(this.seleccion);
                    juanito.enviarSeleccion();
                }
                
            }
            else if(event.target.name === "fantasma")
            {
                if(juanito.seleccionRecibida != 2)
                {
                    juanito.seleccion = 2;
                    juanito.scene.get('Musica').setEsHumano(this.seleccion);
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