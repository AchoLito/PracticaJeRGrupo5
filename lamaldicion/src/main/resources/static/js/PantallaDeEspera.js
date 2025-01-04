class PantallaDeEspera extends Phaser.Scene
{
    constructor()
    {
        super({ key: "PantallaDeEspera"});
    }

    preload()
    {

    }

    create()
    {
        this.text = this.add.text(500, 425, 'Buscando partida...', { fontSize: '32px', fill: '#fff' });
        this.socket = new WebSocket("ws://" + location.host + "/ws");
        this.setupWebSocket();

        this.scene.get('Musica').setSocket(this.socket);
        var alfonso = this;
    }

    update()
    {

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
            }
        };

        this.socket.onclose = () => {

        };
    }
}