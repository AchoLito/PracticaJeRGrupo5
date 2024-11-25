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
        this.load.image('FONDO','imagenes/ESCENARIO_SIN_PASILLO.png');

        //DIALOGO
        this.load.image('CAJA_DIALOGO','imagenes/CajaDialogos.png');

        //PUERTAS
        //(Cargars imagenes de las puertas)

        //PISTAS ANTORCHAS
        //
        //SON PLACEHOLDERS, CUANDO ESTEN LAS PISTAS SUSTITUIS LOS ARCHIVOS :D
        this.load.image('FLECHA_ABAJO', 'imagenes/FLECHA_ABAJO.png');
        this.load.image('FLECHA_ARRIBA', 'imagenes/FLECHA_ARRIBA.png');
        this.load.image('FLECHA_DERECHA', 'imagenes/FLECHA_DERECHA.png');
        this.load.image('FLECHA_IZQUIERDA', 'imagenes/FLECHA_IZQUIERDA.png');
    }

    create()
    {
        this.add.image(1280/2,900/2,'FONDO');

        //HUMANO
        this.humano = new Humano(580,500, this);

        //FANTASMA
        this.fantasma = new Fantasma(659,500, this);

        //ANTORCHAS
        this.antorchas_Array = [];
        this.NUM_ANTORCHAS = 4;
        this.numeroAntorchasEncendidas=0;

        this.antorchas_Array.push(new Antorcha(500,320, this));
        this.antorchas_Array.push(new Antorcha(793,320, this));
        this.antorchas_Array.push(new Antorcha(500,715, this));
        this.antorchas_Array.push(new Antorcha(793,715, this));

        //PISTAS ANTORCHAS
        this.pistas_Array = [];

        this.pistas_Array.push(new Pista(500,370, this, 'FLECHA_DERECHA'));
        this.pistas_Array.push(new Pista(793,370, this, 'FLECHA_IZQUIERDA'));
        this.pistas_Array.push(new Pista(500,665, this, 'FLECHA_ABAJO'));
        this.pistas_Array.push(new Pista(793,665, this, 'FLECHA_ARRIBA'));

        //ESTATUAS
        this.estatuas_Array = [];
        this.NUM_ESTATUAS = 4;
        this.numeroEstatuasCorrectas = 0;

        this.completado = true;

        //El segundo string es para marcar cual es la posicion correcta de la estatua
        this.estatuas_Array.push(new Estatua(320,320, this, 'ESTATUA_ATRAS','ESTATUA_DERECHA'));
        this.estatuas_Array.push(new Estatua(910,320, this,'ESTATUA_FRONTAL','ESTATUA_IZQUIERDA'));
        this.estatuas_Array.push(new Estatua(320,715, this,'ESTATUA_IZQUIERDA','ESTATUA_FRONTAL'));
        this.estatuas_Array.push(new Estatua(910,715, this,'ESTATUA_DERECHA','ESTATUA_ATRAS'));

        //DIALOGOS
        this.dialogo = new Dialogo(this);

        // Configurar los diálogos (puedes tener varios)
        this.dialogo.configurarDialogos
        ([
            { imagenPersonaje: 'BANDIDO_FRONTAL', mensaje: '¿Qué es esto? ¿Dónde estoy? ¿Quién… qué eres tú?' },
            { imagenPersonaje: 'FANTASMA_FRONTAL', mensaje: 'Eso... quisiera saberlo yo también, soy un eco. Una sombra atrapada en este lugar.' },
            { imagenPersonaje: 'BANDIDO_FRONTAL', mensaje: '¿Eres... un fantasma?' }
        ]);

        // PUERTAS
        this.puertas_Array = [];
        this.puertas_Array.push(new Puerta (960, 520, this));
        this.puertas_Array.push(new Puerta (140, 600, this));
        this.puertas_Array.push(new Puerta (380, 320, this));

        this.puertasColliders_Array = [];

        //FUNCIONES DE RESPUESTA
        this.inicializarControlesHumano();
        this.inicializarControlesFantasma();
        this.inicializarColisiones();
        this.colliderMuros();

       /*
        var estatuasGO = Array(6);
        var estatua = Array(6);
        //ESTATUA   
        crearEstatuas(estatuasGO);
*/
    }

    // Función llamada cuando los objetos colisionan    
    
    update()
    {
        this.dialogo.actualizar();
    }
    
    inicializarControlesHumano(){
        
        //MOVIMIENTO
        this.input.keyboard.on('keydown-W', () => { this.humano.input('UP',true);});
        this.input.keyboard.on('keyup-W', () => { this.humano.input('UP',false);});

        this.input.keyboard.on('keydown-S', () => { this.humano.input('DOWN',true); });
        this.input.keyboard.on('keyup-S', () => { this.humano.input('DOWN',false);});
        
        this.input.keyboard.on('keydown-A', () => { this.humano.input('LEFT',true);});
        this.input.keyboard.on('keyup-A', () => {this.humano.input('LEFT',false);});

        this.input.keyboard.on('keydown-D', () => {this.humano.input('RIGHT',true);});
        this.input.keyboard.on('keyup-D', () => {this.humano.input('RIGHT',false);});

        //TECLAS ESPECIALES
        this.input.keyboard.on('keydown-E',  () => {this.humano.input('INTERACT',true);});
        this.input.keyboard.on('keyup-E',  () => {this.humano.input('INTERACT',false);});
    }

    inicializarControlesFantasma(){
        //MOVIMIENTO
        this.input.keyboard.on('keydown-UP', () => { this.fantasma.input('UP',true);});
        this.input.keyboard.on('keyup-UP', () => { this.fantasma.input('UP',false);});

        this.input.keyboard.on('keydown-DOWN', () => { this.fantasma.input('DOWN',true); });
        this.input.keyboard.on('keyup-DOWN', () => { this.fantasma.input('DOWN',false);});
        
        this.input.keyboard.on('keydown-LEFT', () => { this.fantasma.input('LEFT',true);});
        this.input.keyboard.on('keyup-LEFT', () => {this.fantasma.input('LEFT',false);});

        this.input.keyboard.on('keydown-RIGHT', () => {this.fantasma.input('RIGHT',true);});
        this.input.keyboard.on('keyup-RIGHT', () => {this.fantasma.input('RIGHT',false);});

        //TECLAS ESPECIALES
        this.input.keyboard.on('keydown-ENTER',  () => {this.fantasma.input('INTERACT',true);});
        this.input.keyboard.on('keyup-ENTER',  () => {this.fantasma.input('INTERACT',false);});
    }

    inicializarColisiones(){
        //Colision entre jugadores, hacemos q se frenen tras colisionar
        this.physics.add.collider(this.humano.SpriteObject, this.fantasma.SpriteObject, this.manejoDeColisionJugadores);

        /*const grupoAntorchas = this.physics.add.group({immovable: true});
        for(var i=0;i<this.antorchas_Array.length;i++){
            grupoAntorchas.add(this.antorchas_Array[i].SpriteObject);
        }
        this.physics.add.collider(this.humano.SpriteObject,grupoAntorchas,() => {});// Llama al método m() cuando ocurre la colisión*/

        //Colision de las antorchas
        for(let i=0;i<this.antorchas_Array.length;i++){
            
            this.physics.add.collider(this.humano.SpriteObject,this.antorchas_Array[i].SpriteObject);
            this.physics.add.overlap(this.humano.SpriteObject,this.antorchas_Array[i].AreaInteraccion,() => {
                if(this.humano.interacting)
                {
                    var resultadoInteraccion=this.antorchas_Array[i].interactuar();
                    if(resultadoInteraccion===-1){}//no se pudo por cooldown
                    else if(resultadoInteraccion===true)//se encendió
                    {
                        this.numeroAntorchasEncendidas++;
                        if(this.numeroAntorchasEncendidas===this.NUM_ANTORCHAS)
                        {
                            this.activarPistasAntorchas();
                        }
                    }
                    else if(resultadoInteraccion===false)//se apagó
                    {
                        this.numeroAntorchasEncendidas--;
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

        //Colision de las estatuas
        for(let i=0;i<this.estatuas_Array.length;i++){
            
            this.physics.add.collider(this.humano.SpriteObject,this.estatuas_Array[i].SpriteObject);
            this.physics.add.overlap(this.humano.SpriteObject,this.estatuas_Array[i].AreaInteraccion,() => {
                if(this.humano.interacting)
                {
                    var resultadoInteraccion=this.estatuas_Array[i].girarEstatua();
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

                        if(this.numeroEstatuasCorrectas === this.NUM_ESTATUAS)
                        {
                            this.accionEstatua(true);
                        }else
                        {
                            this.accionEstatua(false);
                        }
                    }                    
                }
                else
                {
                    this.estatuas_Array[i].resetearCooldown();
                }
            });
        }

        //Colisiones de las puertas
        for(let i = 0; i < this.puertas_Array.length; i++){
            
            this.puertasColliders_Array.push(this.physics.add.collider(this.humano.SpriteObject,this.puertas_Array[i].puertaCerrada));
            //this.physics.add.collider(this.humano.SpriteObject,this.puertas_Array[i].puertaAbierta);
            this.physics.add.overlap(this.humano.SpriteObject,this.puertas_Array[i].AreaInteraccion,() => {

                if(this.humano.interacting)
                {
                    var resultadoInteraccion = this.puertas_Array[i].interactuar(this.completado);

                    if(resultadoInteraccion === -1)
                    {
                    }//no se pudo por cooldown
                    else if(resultadoInteraccion === true)
                    {
                        console.log('Se ha abierto la puerta');
                        console.log(this.puertasColliders_Array.length);
                        this.physics.world.removeCollider(this.puertasColliders_Array[i])
                    }
                    else if(resultadoInteraccion === false)//se apagó
                    {
                        console.log('Se ha cerrado la puerta');
                        console.log(this.puertasColliders_Array.length);
                        this.physics.world.removeCollider(this.puertasColliders_Array[i])
                        this.puertasColliders_Array[i] = this.physics.add.collider(this.humano.SpriteObject,this.puertas_Array[i].puertaCerrada);
                    }
                }
                else
                {
                    this.puertas_Array[i].resetearCooldown();
                }
            });
        }
    }

    colliderMuros()
    {
        const grupoMuros = this.physics.add.group({immovable: true});

        //Rectangulo 1
        var rect = this.add.rectangle(1280/2, 92 , 1280,80, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Rectangulo 2
        var rect = this.add.rectangle(45, 325 , 90, 492, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Rectangulo 3
        var rect = this.add.rectangle(800, 200, 702, 175, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Rectangulo 4
        var rect = this.add.rectangle(800, 200, 702, 175, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 5
        var rect = this.add.rectangle(255, 260, 140, 55, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 6
        var rect = this.add.rectangle(225, 403, 80, 340, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 7
        var rect = this.add.rectangle(640, 910, 1280, 340, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 8
        var rect = this.add.rectangle(110, 910, 300, 410, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 9
        var rect = this.add.rectangle(1000, 710, 50, 260, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 10
        var rect = this.add.rectangle(1000, 315, 50, 260, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 11
        var rect = this.add.rectangle(1105, 710, 260, 155, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 12
        var rect = this.add.rectangle(1105, 315, 260, 155, 0x000000,0);
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
        for(var i=0;i<this.NUM_ANTORCHAS;i++)
        {
            this.antorchas_Array[i].rect.setFillStyle(0x0011ff, 1);
            this.pistas_Array[i].SpriteObject.setVisible(true);
        }
    }
    desActivarPistasAntorchas()
    {
        for(var i=0;i<this.NUM_ANTORCHAS;i++)
        {
            if( this.antorchas_Array[i].encendida){
                this.antorchas_Array[i].rect.setFillStyle(0xffffff, 1);               
            }
            this.pistas_Array[i].SpriteObject.setVisible(false);
        }
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
            console.log("Has hecho el puzle");
            this.completado = true;
        }
        else
        {
            console.log("Has deshecho el puzle");
            this.completado = false;
        }
        
    }
}
