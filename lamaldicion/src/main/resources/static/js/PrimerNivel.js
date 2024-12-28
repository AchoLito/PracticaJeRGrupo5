class PrimerNivel extends Phaser.Scene
{
    constructor()
    {
        super({ key: "PrimerNivel"});
        this.dialogo = null;
    }

    preload()
    {
        //SPRITE FANTASMA
        this.load.image('FANTASMA_ATRAS', 'imagenes/FANTASMA_ATRAS.png');
        this.load.image('FANTASMA_FRONTAL', 'imagenes/FANTASMA_DELANTE.png');
        this.load.image('FANTASMA_IZQUIERDA', 'imagenes/FANTASMA_PERFIL_IZQUIERDO.png');
        this.load.image('FANTASMA_DERECHA', 'imagenes/FANTASMA_PERFIL_DERECHO.png');

        //SPRITE BANDIDO
         this.load.image('BANDIDO_ATRAS', 'imagenes/BANDIDO_ATRAS.png');
         this.load.image('BANDIDO_FRONTAL', 'imagenes/BANDIDO_DELANTE.png');
         this.load.image('BANDIDO_IZQUIERDA', 'imagenes/BANDIDO_PERFIL_IZQUIERDO.png');
         this.load.image('BANDIDO_DERECHA', 'imagenes/BANDIDO_PERFIL_DERECHO.png');

        //SPRITE ESTATUA
        this.load.image('ESTATUA_ATRAS','imagenes/ESTATUA_ATRAS.png');
        this.load.image('ESTATUA_FRONTAL','imagenes/ESTATUA_FRONTAL.png');
        this.load.image('ESTATUA_IZQUIERDA','imagenes/ESTATUA_IZQ.png');
        this.load.image('ESTATUA_DERECHA','imagenes/ESTATUA_DERECHA.png');

        //SPRITE FONDO
        this.load.image('FONDO_SP_SB','imagenes/ESCENARIO_SIN_PASILLO.png');
        this.load.image('FONDO_CP_SB','imagenes/ESCENARIO_CON_PASILLO.png');
        this.load.image('FONDO_CP_CB','imagenes/ESCENARIO_CON_DIBUJO_BALDOSAS.png');
        this.load.image('FONDO_SP_CB','imagenes/ESCENARIO_CON_DIBUJO_BALDOSAS_SIN_PASILLO.png');

        //DIALOGO
        this.load.image('CAJA_DIALOGO','imagenes/CajaDialogos.png');
        this.load.image('HUMANO','imagenes/HUMANO.png');
        this.load.image('FANTASMA','imagenes/FANTASMA.png');

        //INVENTARIO
        this.load.image('INVENTARIO','imagenes/INVENTARIO.png');

        //pal
        this.load.image('PALANCA','imagenes/PALANCA.png');
        this.load.image('BASE_PALANCA','imagenes/BASE_PALANCA.png');
        this.load.image('ABAJO_PALANCA','imagenes/PALANCA_HACIA_ABAJO.png');
        this.load.image('ARRIBA_PALANCA','imagenes/PALANCA_HACIA_ARRIBA.png');

  
        //PUERTAS
        this.load.image('PUERTA_FRONTAL_CERRADA','imagenes/PUERTA_FRONTAL_2.png');
        this.load.image('PUERTA_FRONTAL_ABIERTA','imagenes/PUERTA_PERFIL_2.png');
        this.load.image('PUERTA_LATERAL_CERRADA','imagenes/PUERTA_PERFIL_1.png');
        this.load.image('PUERTA_LATERAL_ABIERTA','imagenes/PUERTA_FRONTAL_1.png');
        

        //ANTORCHAS 
        this.load.image('ANTORCHA_APAGADA','imagenes/ANTORCHA_APAGADA.png');
        this.load.image('ANTORCHA_ENCENDIDA','imagenes/ANTORCHA_ENCENDIDA.png');

        this.load.audio('ESTATUA','audio/MoverEstatua.mp3');
        this.load.audio('PUERTA','audio/SonidoPuerta.mp3');

        //BOTONES

        this.load.image('BOTON_PAUSA','imagenes/iconoBoton_Pausa.png');
        this.load.image('BOTON_CHAT','imagenes/iconoBoton_Chat.png');
        this.load.audio("clic", "audio/clic.mp3"); // sonido pulsar botón
    }

    create()
    {
        this.fondo = new FondoNivel1(1280/2,900/2,this);

        this.finNivel = new FinNivel(15,630, this);
        

        this.BotonChat = this.add.image(70, 70, 'BOTON_CHAT').setScale(0.7,0.7)
        .setInteractive().on("pointerdown", () => {
            this.sound.play("clic");
            this.scene.launch("Chat");
            this.scene.pause("PrimerNivel");   
        });
        this.BotonPausa = this.add.image(70, 165, 'BOTON_PAUSA').setScale(0.65,0.65)
        .setInteractive().on("pointerdown", () => {
            this.sound.play("clic");
            this.scene.launch("MenuPausa");
            this.scene.pause("PrimerNivel");
        });

        this.palancaPared_Estatua = new PalancaPared(450,300, this, false); 

        this.palancaPared_Puerta = new PalancaPared(350,95, this, true); 
        this.palancaPared_Puerta.SpriteObject.setVisible(false);

        this.pasilloDescubierto=false;

        this.herramientaActiva='';
        //ANTORCHAS
        this.antorchas_Array = [];
        this.NUM_ANTORCHAS = 4;
        this.numeroAntorchasEncendidas=0;

        this.antorchas_Array.push(new Antorcha(500,320, this));
        this.antorchas_Array.push(new Antorcha(793,320, this));
        this.antorchas_Array.push(new Antorcha(500,715, this));
        this.antorchas_Array.push(new Antorcha(793,715, this));

        // PUERTAS
        this.puertas_Array = [];
        this.puertas_Array.push(new Puerta (968, 500, this,'PUERTA_LATERAL_CERRADA','PUERTA_LATERAL_ABIERTA'));
        this.puertas_Array.push(new Puerta (173, 568, this,'PUERTA_FRONTAL_CERRADA','PUERTA_FRONTAL_ABIERTA'));
        this.puertas_Array.push(new Puerta (380, 295, this,'PUERTA_FRONTAL_CERRADA','PUERTA_FRONTAL_ABIERTA'));

        this.puertasColliders_Array = [];
        

        this.esHumano = this.scene.get('Musica').getEsHumano();// lo recibe de la pantalla de eleccion de personaje
        //HUMANO
        this.humano = new Humano(580,500, this);

        //FANTASMA
        this.fantasma = new Fantasma(659,500, this);

        
        //ESTATUAS
        this.estatuas_Array = [];
        this.NUM_ESTATUAS = 6;
        this.numeroEstatuasCorrectas = 0;

        

        //El segundo string es para marcar cual es la posicion correcta de la estatua
        this.estatuas_Array.push(new Estatua(320,515, this, 'ESTATUA_ATRAS','ESTATUA_DERECHA'));
        this.estatuas_Array.push(new Estatua(380,655, this,'ESTATUA_DERECHA','ESTATUA_ATRAS'));
        this.estatuas_Array.push(new Estatua(380,320, this,'ESTATUA_IZQUIERDA','ESTATUA_FRONTAL'));
        this.estatuas_Array.push(new Estatua(910,320, this,'ESTATUA_DERECHA','ESTATUA_FRONTAL'));
        this.estatuas_Array.push(new Estatua(910,655, this,'ESTATUA_IZQUIERDA','ESTATUA_ATRAS'));
        this.estatuas_Array.push(new Estatua(1150,515, this,'ESTATUA_DERECHA','ESTATUA_IZQUIERDA'));

     //   this.palancaPared_Estatua.moverEstatua(this.estatuas_Array[2]) ;

        //DIALOGOS
        this.dialogo = new Dialogo(this);

        // Configurar los diálogos (puedes tener varios)
        this.dialogo.configurarDialogos
        ([
            { imagenPersonaje: 'HUMANO', mensaje: '¿Qué es esto? ¿Dónde estoy? ¿Quién… qué eres tú?' },
            { imagenPersonaje: 'FANTASMA', mensaje: 'Eso... quisiera saberlo yo también, soy un eco. Una sombra atrapada en este lugar.' },
            { imagenPersonaje: 'HUMANO', mensaje: '¿Eres... un fantasma?' },
            { imagenPersonaje: 'FANTASMA', mensaje: 'Supongo que lo soy. Aunque el término no alcanza para describir lo que significa estar... aquí. No soy como tú, pero tampoco estoy completamente perdido.' },
            { imagenPersonaje: 'HUMANO', mensaje: '¿Qué es este lugar?' },
            { imagenPersonaje: 'FANTASMA', mensaje: 'Un castillo que respira. Una prisión de piedra y memoria. Nadie llega aquí por accidente.' },
            { imagenPersonaje: 'HUMANO', mensaje: '¿Tú también estás atrapado?' },
            { imagenPersonaje: 'FANTASMA', mensaje: 'Sí. Y por más tiempo del que puedo recordar. Este lugar... se alimenta de lo que éramos, borra lo que fuimos. Pero creo que tú puedes cambiar eso, para ambos.' },
            { imagenPersonaje: 'HUMANO', mensaje: '¿Yo? ¿Cómo podría ayudarte yo a ti?' },
            { imagenPersonaje: 'FANTASMA', mensaje: 'No ahora. Pero juntos podemos descubrirlo. Lo único que sé con certeza es que este castillo no quiere que te vayas. Si no nos ayudamos el uno al otro, no saldrás de aquí con vida.' },
            { imagenPersonaje: 'HUMANO', mensaje: 'Esto no puede estar pasando.' },
            { imagenPersonaje: 'FANTASMA', mensaje: 'Lo sé. Todo parece un mal sueño. Pero estás aquí, y eso significa que tienes un propósito. Confía en eso, aunque no confíes en mí todavía.' },
            { imagenPersonaje: 'HUMANO', mensaje: 'De acuerdo. Pero... ¿por dónde empezamos?' },
            { imagenPersonaje: 'FANTASMA', mensaje: 'Primero deberíamos encontrar la forma de sacarte de aquí. Este lugar es un laberinto, pero algunos caminos nos llevarán más cerca de las respuestas. Y otros... nos llevarán al final.' },
            { imagenPersonaje: 'HUMANO', mensaje: '¿Al final? ¿Quieres decir… la muerte?' },
            { imagenPersonaje: 'FANTASMA', mensaje: 'No, algo peor que eso. Mantente cerca. Este castillo nos está mirando.' }
        ]);

        //INVENTARIO
        this.inventario= new Inventario(1105,80, this );
        this.palanca= new PalancaInventario(1100,450, this );
        this.palancaRecogida=false;


        //WEBSOKETS
        this.socket = this.scene.get('Musica').getSocket();
        this.setupWebSocket();

        this.t_EnvioControl=0;
        this.frec_EnvioControl=3000;//milisegundos

        //FUNCIONES DE RESPUESTA
        if(this.esHumano){
            this.inicializarControlesHumano();
            this.inicializarControlesInventario();
        }
        else{
            this.inicializarControlesFantasma();
        }

        this.inicializarColisiones();
        this.colliderMuros();

        this.input.keyboard.on('keydown-SPACE', () => { this.dialogo.actualizar();});
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
        this.enviarPosicion();
        this.enviarDatosEstatuas_CTR();
        this.enviarDatosAntorchas_CTR();
        this.enviarDatosPalancas();
        this.enviarPalancaSuelo();      
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
                case 'p'://recibimos posiciones del otro personaje cada x segundos como control
                    if(this.esHumano){
                        //movemos fantasma
                        this.fantasma.setPos(data);
                    }
                    else{
                        //movemos humano
                        this.humano.setPos(data);
                    }
                    break;
                case 'v'://recibimos direcciones del otro personaje, cada vez q pulsa una tecla
                    if(this.esHumano){
                        this.fantasma.desplazarse(data);
                    }
                    else{
                        this.humano.desplazarse(data);
                    }
                    break;
                case 'e'://recibimos direccion de una estatua, cada vez que el otro gira una
                    this.estatuas_Array[data.n].setDireccion(data.dir);
                    this.estatuas_Array[data.n].correcta=data.corr;
                    this.numeroEstatuasCorrectas=data.nCor;

                    this.accionEstatua(this.numeroEstatuasCorrectas === this.NUM_ESTATUAS);
                    break;
                case 'E'://recibimos info de todas las estatuas, como control cada x segundos
                    for(var i=0;i<this.NUM_ESTATUAS;i++){
                        this.estatuas_Array[i].setDireccion(data.arr[i].dir);
                        this.estatuas_Array[i].correcta=data.arr[i].corr;
                    }
                    this.numeroEstatuasCorrectas=data.nCor;
                    this.accionEstatua(this.numeroEstatuasCorrectas === this.NUM_ESTATUAS);
                    break;
                case 'a'://recibimos estado de una antorcha
                    this.antorchas_Array[data.n].setEncendida(data.val);
                    this.numeroAntorchasEncendidas=data.nEnc;

                    if(this.numeroAntorchasEncendidas===this.NUM_ANTORCHAS){
                        this.activarPistasAntorchas();
                    }
                    else this.desActivarPistasAntorchas();

                    break;
                case 'A'://recibimos info de todas las antorchas, como control cada x segundos
                    this.numeroAntorchasEncendidas=data.nEnc;
                    for(var i=0;i<this.NUM_ANTORCHAS;i++){
                        this.antorchas_Array[i].setEncendida(data.arr[i]);
                    }

                    if(this.numeroAntorchasEncendidas===this.NUM_ANTORCHAS){
                        this.activarPistasAntorchas();
                    }
                    else this.desActivarPistasAntorchas();

                    break;
                case 'P'://recibimos datos de todas las palancas, al cambiarlas y cada x segundos

                    //Palanca 1
                    if(data.met1){
                        if(! this.palancaPared_Estatua.metida)//Primera Vez Que la Metes
                        {
                            this.palancaPared_Estatua.meter();
                        }
                        if(data.us1 && ! this.palancaPared_Estatua.usada)//Primera Vez Que la Usas
                        {
                           this.usarPalancaPared_Estatua();
                        }
                    }
                    
                    //Palanca 2
                    if(data.met2){
                        if(! this.palancaPared_Puerta.metida)//Primera Vez Que la Metes
                        {
                            this.palancaPared_Puerta.meter();
                        }
                        if(data.us2 && ! this.palancaPared_Puerta.usada)//Primera Vez Que la Usas
                        {
                            this.usarPalancaPared_Puerta();
                        }
                    }
                    break;
                case'L'://recibimos si la palanca del suelo ha sido cogida o no, al cogerla y cada x segundos
                    this.palancaRecogida=data;
                    if(data===true){
                        this.palanca.interactuar(this.inventario);
                    }
                    break;
                case'X': //Fin de la Partida
                    cambiarDeNivel();
                    break;
            }
        };

        this.socket.onclose = () => {
            this.gameStarted = false;
        };
    }
    
    enviarPosicion(){//se llama cada x segundo
        if(this.esHumano){
            this.sendMessage('p',this.humano.getPos());
        }else{
            this.sendMessage('p',this.fantasma.getPos());
        }
    }
    
    enviarVelocidad(direccion){//lo llama el imput de teclado
        this.sendMessage('v',direccion);
    }

    enviarDatosEstatua(numeroEstatua){ //en la funcion de colisiones, cuando interactuamos con una
        const data = {
            n: numeroEstatua,
            dir: this.estatuas_Array[numeroEstatua].getDireccion(),
            corr: this.estatuas_Array[numeroEstatua].correcta,
            nCor: this.numeroEstatuasCorrectas
        };
        this.sendMessage('e',data);
    }
    enviarDatosEstatuas_CTR()//se llama cada x segundo
    {
        var array = [];
        for(var i=0;i<this.NUM_ESTATUAS;i++){
            array[i] = {
                dir: this.estatuas_Array[i].getDireccion(),
                corr: this.estatuas_Array[i].correcta
            };
            
        }
        const data ={
            nCor: this.numeroEstatuasCorrectas,
            arr: array
        }
        this.sendMessage('E', data);
    }

    enviarDatosAntorcha(numeroAntorcha){ //en la funcion de colisiones, cuando interactuamos con una
        const data = {
            n: numeroAntorcha,
            val: this.antorchas_Array[numeroAntorcha].getEncendida(),
            nEnc: this.numeroAntorchasEncendidas
        };
        this.sendMessage('a',data);
    }
    enviarDatosAntorchas_CTR()//se llama cada x segundo
    {
        var array = [];
        for(var i=0;i<this.NUM_ANTORCHAS;i++){
            array[i] = this.antorchas_Array[i].getEncendida();
        }

        const data ={
            nEnc: this.numeroAntorchasEncendidas,
            arr: array
        }
        this.sendMessage('A', data);
    }

    enviarDatosPalancas(){//cada x segundos y al cambiar palanca
        const data = {
            met1: this.palancaPared_Estatua.metida,
            us1:this.palancaPared_Estatua.usada,
            met2: this.palancaPared_Puerta.metida,
            us2:this.palancaPared_Puerta.usada
        }
        this.sendMessage('P', data);
    }

    enviarPalancaSuelo(){
        if(this.palancaRecogida===true){
            this.sendMessage('L', this.palancaRecogida);
        }
    }

    inicializarControlesHumano(){
        
        //MOVIMIENTO
        this.input.keyboard.on('keydown-W', () => { this.enviarVelocidad(this.humano.input('UP',true));});
        this.input.keyboard.on('keyup-W', () => { this.enviarVelocidad(this.humano.input('UP',false));});

        this.input.keyboard.on('keydown-S', () => { this.enviarVelocidad(this.humano.input('DOWN',true));});
        this.input.keyboard.on('keyup-S', () => { this.enviarVelocidad(this.humano.input('DOWN',false));});
        
        this.input.keyboard.on('keydown-A', () => { this.enviarVelocidad(this.humano.input('LEFT',true));});
        this.input.keyboard.on('keyup-A', () => { this.enviarVelocidad(this.humano.input('LEFT',false));});

        this.input.keyboard.on('keydown-D', () => { this.enviarVelocidad(this.humano.input('RIGHT',true));});
        this.input.keyboard.on('keyup-D', () => { this.enviarVelocidad(this.humano.input('RIGHT',false));});

        //TECLAS ESPECIALES
        this.input.keyboard.on('keydown-E',  () => { this.humano.input('INTERACT',true);});
        this.input.keyboard.on('keyup-E',  () => { this.humano.input('INTERACT',false);});
    }

    inicializarControlesFantasma(){
        //MOVIMIENTO
        this.input.keyboard.on('keydown-UP', () => { this.enviarVelocidad(this.fantasma.input('UP',true));});
        this.input.keyboard.on('keyup-UP', () => { this.enviarVelocidad(this.fantasma.input('UP',false));});

        this.input.keyboard.on('keydown-DOWN', () => { this.enviarVelocidad(this.fantasma.input('DOWN',true));});
        this.input.keyboard.on('keyup-DOWN', () => { this.enviarVelocidad(this.fantasma.input('DOWN',false));});
        
        this.input.keyboard.on('keydown-LEFT', () => { this.enviarVelocidad(this.fantasma.input('LEFT',true));});
        this.input.keyboard.on('keyup-LEFT', () => { this.enviarVelocidad(this.fantasma.input('LEFT',false));});

        this.input.keyboard.on('keydown-RIGHT', () => { this.enviarVelocidad(this.fantasma.input('RIGHT',true));});
        this.input.keyboard.on('keyup-RIGHT', () => { this.enviarVelocidad(this.fantasma.input('RIGHT',false));});

        //TECLAS ESPECIALES
        this.input.keyboard.on('keydown-ENTER',  () => {this.fantasma.input('INTERACT',true);});
        this.input.keyboard.on('keyup-ENTER',  () => {this.fantasma.input('INTERACT',false);});
    }

    inicializarControlesInventario(){
        this.input.keyboard.on('keydown-ONE', () => { this.herramientaActiva = this.inventario.getHerramienta(0)});
        this.input.keyboard.on('keydown-TWO', () => { this.herramientaActiva = this.inventario.getHerramienta(1)});
        this.input.keyboard.on('keydown-THREE', () => { this.herramientaActiva = this.inventario.getHerramienta(2)});
    }
    inicializarColisiones(){
        //Colision entre jugadores, hacemos q se frenen tras colisionar
        this.physics.add.collider(this.humano.SpriteObject, this.fantasma.SpriteObject, this.manejoDeColisionJugadores);


        this.physics.add.overlap(this.humano.SpriteObject,this.finNivel.AreaInteraccion,() => 
        {
            this.cambiarDeNivel();
            
        });

        //Coision palanca
        this.physics.add.collider(this.humano.SpriteObject,this.palanca.SpriteObject);
        if(this.esHumano){
            this.physics.add.overlap(this.humano.SpriteObject,this.palanca.AreaInteraccion,() => {
                if(this.humano.interacting)
                {
                    this.palanca.interactuar(this.inventario);
                    this.palancaRecogida=true;
                    this.enviarPalancaSuelo();               
                }
            });
        }
        
        //Interaccion Palanca Estatua
        this.physics.add.collider(this.humano.SpriteObject,this.palancaPared_Estatua.SpriteObject);

        if(this.esHumano){
            this.physics.add.overlap(this.humano.SpriteObject,this.palancaPared_Estatua.AreaInteraccion,() => {
                if(this.humano.interacting && this.herramientaActiva === 'PALANCA')
                {       
                    if(!this.palancaPared_Estatua.metida && !this.palancaPared_Estatua.cooldown)
                    {
                        this.palancaPared_Estatua.meter();
                        this.enviarDatosPalancas();
                    }
                    else
                    {
                        if(this.palancaPared_Estatua.cooldown){}
                        else if(!this.palancaPared_Estatua.usada && !this.cooldown){

                            this.usarPalancaPared_Estatua();
                            this.enviarDatosPalancas();
                        }
                    }                                         
                }
                else
                {
                    this.palancaPared_Estatua.cooldown = false;
                }
            });
        }
        else{
            this.physics.add.overlap(this.fantasma.SpriteObject,this.palancaPared_Estatua.AreaInteraccion,() => {
                if(this.fantasma.interacting)
                {       
                    if(!this.palancaPared_Estatua.usada && this.palancaPared_Estatua.metida){
                        
                        this.usarPalancaPared_Estatua();
                        this.enviarDatosPalancas();
                    }
                }                                                 
                else
                {
                    this.palancaPared_Estatua.cooldown = false;
                }
            });
        }

        //Interaccion Palanca Puerta
        this.physics.add.collider(this.humano.SpriteObject,this.palancaPared_Puerta.SpriteObject);
        if(this.esHumano){
            this.physics.add.overlap(this.humano.SpriteObject,this.palancaPared_Puerta.AreaInteraccion,() => {
                if(this.humano.interacting)
                {             
                    if(!this.palancaPared_Puerta.usada){
                        this.usarPalancaPared_Puerta();
                        this.enviarDatosPalancas();
                    }
                             
                }
            });
        }
        else{
            this.physics.add.overlap(this.fantasma.SpriteObject,this.palancaPared_Puerta.AreaInteraccion,() => {
                if(this.fantasma.interacting)
                {             
                    if(!this.palancaPared_Puerta.usada){
                        this.usarPalancaPared_Puerta();
                        this.enviarDatosPalancas();
                    }
                             
                }
            });
        }

        
        
        //Colision de las antorchas
        for(let i=0;i<this.antorchas_Array.length;i++){
            
            this.physics.add.collider(this.humano.SpriteObject,this.antorchas_Array[i].SpriteObject);
            if(this.esHumano)//solo calculamos colisiones de interaccion si es con el personaje que manejamos
            {
                this.physics.add.overlap(this.humano.SpriteObject,this.antorchas_Array[i].AreaInteraccion,() => {
                    if(this.humano.interacting)
                    {
                        var resultadoInteraccion=this.antorchas_Array[i].interactuar();
                        if(resultadoInteraccion===-1){}//no se pudo por cooldown
                        else if(resultadoInteraccion===true)//se encendió
                        {
                            this.numeroAntorchasEncendidas++;
                            this.enviarDatosAntorcha(i);
                            if(this.numeroAntorchasEncendidas===this.NUM_ANTORCHAS)
                            {
                                this.activarPistasAntorchas();
                            }
                        }
                        else if(resultadoInteraccion===false)//se apagó
                        {
                            this.numeroAntorchasEncendidas--;
                            this.enviarDatosAntorcha(i);
                            if(this.numeroAntorchasEncendidas+1 ===this.NUM_ANTORCHAS)
                            {
                                this.desActivarPistasAntorchas();
                            }
                        }
                    }
                    else
                    {
                        this.antorchas_Array[i].resetearCooldown();
                    }
                });
            }
            
        }

        //Colision de las estatuas
        for(let i=0;i<this.estatuas_Array.length;i++){
            
            this.physics.add.collider(this.humano.SpriteObject,this.estatuas_Array[i].SpriteObject);

            if(this.esHumano)//solo calculamos colisiones de interaccion si es con el personaje que manejamos
            {
                this.physics.add.overlap(this.humano.SpriteObject,this.estatuas_Array[i].AreaInteraccion,() => {
                    if(this.humano.interacting)
                    {
                        var resultadoInteraccion=this.estatuas_Array[i].girarEstatua();
                        this.sound.play('ESTATUA');
                        if(!(resultadoInteraccion===-1))
                        {
                            
    
                            if(this.comprobarPosicionEstatua(this.estatuas_Array[i]))
                            {
                                this.estatuas_Array[i].correcta = true;
                            }
                            else
                            {
                                this.estatuas_Array[i].correcta = false;
                            }
                            this.numeroEstatuasCorrectas = 0;
                            for(let j = 0; j < this.estatuas_Array.length; j++)
                            {
                                if(this.estatuas_Array[j].correcta)
                                {
                                    this.numeroEstatuasCorrectas++;
                                }
                            }
    
                            this.accionEstatua(this.numeroEstatuasCorrectas === this.NUM_ESTATUAS);

                            this.enviarDatosEstatua(i);
                        }                    
                    }
                    else
                    {
                        this.estatuas_Array[i].resetearCooldown();
                    }
                });
            }
            else
            {
                this.physics.add.overlap(this.fantasma.SpriteObject,this.estatuas_Array[i].AreaInteraccion,() => {
                    if(this.fantasma.interacting)
                    {
                        var resultadoInteraccion=this.estatuas_Array[i].girarEstatua();
                        this.sound.play('ESTATUA');
                        if(!(resultadoInteraccion===-1))
                        {
    
                            if(this.comprobarPosicionEstatua(this.estatuas_Array[i]))
                            {
                                this.estatuas_Array[i].correcta = true;
                            }
                            else
                            {
                                this.estatuas_Array[i].correcta = false;
                            }
                            this.numeroEstatuasCorrectas = 0;
                            for(let j = 0; j < this.estatuas_Array.length; j++)
                            {
                                if(this.estatuas_Array[j].correcta)
                                {
                                    this.numeroEstatuasCorrectas++;
                                }
                            }

                            this.accionEstatua(this.numeroEstatuasCorrectas === this.NUM_ESTATUAS);

                            this.enviarDatosEstatua(i);
                        }                    
                    }
                    else
                    {
                        this.estatuas_Array[i].resetearCooldown();
                    }
                });
            }
            

            
        }

        //Colisiones de las puertas
        for(let i = 0; i < this.puertas_Array.length; i++){

            this.puertasColliders_Array.push(this.physics.add.collider(this.humano.SpriteObject,this.puertas_Array[i].puertaCerrada));
            //this.physics.add.collider(this.humano.SpriteObject,this.puertas_Array[i].puertaAbierta);
           
        }
    }

    usarPalancaPared_Estatua(){
        this.palancaPared_Estatua.moverEstatua(this.estatuas_Array[2]);
        this.sound.play('ESTATUA');
        
        this.fondo.cambioFondo(true, false);
        this.pasilloDescubierto = true;
        this.palancaPared_Puerta.SpriteObject.setVisible(true);

        this.palancaPared_Estatua.usar();
    }
    usarPalancaPared_Puerta(){
        this.palancaPared_Puerta.usar();
        this.abrirYCerrarPuertaBajo(true);  
        this.abrirYCerrarPuertaArriba(true);  
    }

    colliderMuros()
    {
        const grupoMuros = this.physics.add.group({immovable: true});

        //Rectangulo 1
        var rect = this.add.rectangle(1280/2, 40 , 1280,80, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Rectangulo 2
        var rect = this.add.rectangle(60, 325 , 110, 482, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Rectangulo 3
        var rect = this.add.rectangle(800, 175, 720, 215, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 5
        var rect = this.add.rectangle(285, 245, 100, 35, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 6
        var rect = this.add.rectangle(250, 393, 40, 340, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 7
        var rect = this.add.rectangle(640, 910, 1280, 360, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 8
        var rect = this.add.rectangle(110, 910, 300, 410, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 9
        var rect = this.add.rectangle(1010, 730, 70, 260, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 10
        var rect = this.add.rectangle(1010, 315, 70, 260, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 11
        var rect = this.add.rectangle(1105, 745, 260, 155, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 12
        var rect = this.add.rectangle(1105, 265, 260, 155, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 13
        var rect = this.add.rectangle(1250, 465, 80, 400, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        this.physics.add.collider(this.humano.SpriteObject,grupoMuros);
        this.physics.add.collider(this.fantasma.SpriteObject,grupoMuros);
        
    }

    manejoDeColisionJugadores(humanoObj, fantasmaObj) 
    {
        humanoObj.setVelocityX(0);
        humanoObj.setVelocityY(0);
        fantasmaObj.setVelocityX(0);
        fantasmaObj.setVelocityY(0);
    }

    activarPistasAntorchas()//se llama cuando se encienden todas las antorchas
    {
       
        this.fondo.cambioFondo(this.pasilloDescubierto,true);
    }
    desActivarPistasAntorchas()
    {
        this.fondo.cambioFondo(this.pasilloDescubierto,false);
    }

    comprobarPosicionEstatua(estatua)
    {
        if(estatua.direccion === estatua.posCorrecta)
        {
            return true;
        }
        else
        {
            return false;
        }

    }

    accionEstatua(hecho)
    {
        //Aqui se haria la implementacion de lo que pase cuando
        //las estatuas esten en su posicion
        if(hecho)
        {
            this.puertas_Array[0].interactuar(true);
            
            this.physics.world.removeCollider(this.puertasColliders_Array[0]);
        }
        else
        {
            var n =this.puertas_Array[0].interactuar(false);

            
            if(!n){
                this.physics.world.removeCollider(this.puertasColliders_Array[0]);
                this.puertasColliders_Array[0] =this.physics.add.collider(this.humano.SpriteObject,this.puertas_Array[0].puertaCerrada);
            } 


            
        }
    }
    cambiarDeNivel(){
        this.scene.stop("PrimerNivel");
        this.scene.start("Fin");

    }
    abrirYCerrarPuertaArriba(hecho){
        if(hecho)
        {
            this.sound.play('PUERTA');
            this.puertas_Array[2].interactuar(true);
            
            this.physics.world.removeCollider(this.puertasColliders_Array[2]);
        }
        else
        {
            this.sound.play('PUERTA');
            var n =this.puertas_Array[2].interactuar(false);

            
            if(!n){
                this.physics.world.removeCollider(this.puertasColliders_Array[2]);
                this.puertasColliders_Array[2] =this.physics.add.collider(this.humano.SpriteObject,this.puertas_Array[2].puertaCerrada);
            } 


            
        }
    }

    abrirYCerrarPuertaBajo(hecho){
        if(hecho)
        {
            this.sound.play('PUERTA');
            this.puertas_Array[1].interactuar(true);
            
            this.physics.world.removeCollider(this.puertasColliders_Array[1]);
        }
        else
        {
            this.sound.play('PUERTA');
            var n =this.puertas_Array[1].interactuar(false);

            
            if(!n){
                this.physics.world.removeCollider(this.puertasColliders_Array[1]);
                this.puertasColliders_Array[1] =this.physics.add.collider(this.humano.SpriteObject,this.puertas_Array[1].puertaCerrada);
            } 


            
        }
    }
}
