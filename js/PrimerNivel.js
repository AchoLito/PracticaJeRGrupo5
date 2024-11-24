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

        //SPRITE ESTATUA
        this.load.image('ESTATUA_ATRAS','imagenes/ESTATUA_ATRAS.png');
        this.load.image('ESTATUA_FRONTAL','imagenes/ESTATUA_FRONTAL.png');
        this.load.image('ESTATUA_IZQUIERDA','imagenes/ESTATUA_IZQ.png');
        this.load.image('ESTATUA_DERECHA','imagenes/ESTATUA_DERECHA.png');

        //SPRITE FONDO
        this.load.image('FONDO','imagenes/Escenario.png');
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

        //ESTATUAS
        this.estatuas_Array = [];
        this.NUM_ESTATUAS = 4;
        this.numeroEstatuasCorrectas = 0;

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
            { imagenPersonaje: 'ESTATUA_FRONTAL', mensaje: '¡Hola, soy el primer personaje!' },
            { imagenPersonaje: 'ESTATUA_ATRAS', mensaje: 'Ahora soy otro personaje, ¿qué tal?' },
            { imagenPersonaje: 'ESTATUA_FRONTAL', mensaje: 'Gracias por escucharme. ¡Nos vemos pronto!' }
        ]);

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
    /*
    crearEstatua(estatua){
        estatua[0] = this.physics.add.sprite(80, 80, 'ESTATUA_ATRAS.png');
        estatua[0].body.setImmovable(true);
        estatua[0].body.setAllowGravity(false);
        this.estatua[0] = new Estatua(80, 80,'ESTATUA_ATRAS.png');

        estatua[1] = this.physics.add.sprite(90, 80, 'ESTATUA_ATRAS.png');
        estatua[1].body.setImmovable(true);
        estatua[1].body.setAllowGravity(false);
        this.estatua[1] = new Estatua(90, 80,'ESTATUA_ATRAS.png');

        estatua[2] = this.physics.add.sprite(80, 90, 'ESTATUA_ATRAS.png');
        estatua[2].body.setImmovable(true);
        estatua[2].body.setAllowGravity(false);
        this.estatua[2] = new Estatua(80, 90,'ESTATUA_ATRAS.png');

        estatua[3] = this.physics.add.sprite(70, 80, 'ESTATUA_ATRAS.png');
        estatua[3].body.setImmovable(true);
        estatua[3].body.setAllowGravity(false);
        this.estatua[3] = new Estatua(70, 80,'ESTATUA_ATRAS.png');

        estatua[4] = this.physics.add.sprite(80, 70, 'ESTATUA_ATRAS.png');
        estatua[4].body.setImmovable(true);
        estatua[4].body.setAllowGravity(false);
        this.estatua[4] = new Estatua(80, 70,'ESTATUA_ATRAS.png');

        estatua[5] = this.physics.add.sprite(100, 100, 'ESTATUA_ATRAS.png');
        estatua[5].body.setImmovable(true);
        estatua[5].body.setAllowGravity(false);
        this.estatua[5] = new Estatua(100, 100,'ESTATUA_ATRAS.png');
    }
    */

    
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
                            this.accionEstatua();
                        }
                    }                    
                }
                else
                {
                    this.estatuas_Array[i].resetearCooldown();
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

        this.physics.add.collider(this.humano.SpriteObject,grupoMuros);
        this.physics.add.collider(this.fantasma.SpriteObject,grupoMuros);

        //Recatangulo 5
        var rect = this.add.rectangle(255, 260, 140, 55, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        this.physics.add.collider(this.humano.SpriteObject,grupoMuros);
        this.physics.add.collider(this.fantasma.SpriteObject,grupoMuros);

        //Recatangulo 6
        var rect = this.add.rectangle(225, 403, 80, 340, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        this.physics.add.collider(this.humano.SpriteObject,grupoMuros);
        this.physics.add.collider(this.fantasma.SpriteObject,grupoMuros);

        //Recatangulo 7
        var rect = this.add.rectangle(640, 910, 1280, 340, 0x000000,0);
        grupoMuros.add(this.physics.add.existing(rect));

        //Recatangulo 8
        var rect = this.add.rectangle(110, 910, 300, 410, 0x000000,0);
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
        }
    }
    desActivarPistasAntorchas()
    {
        for(var i=0;i<this.NUM_ANTORCHAS;i++)
        {
            if( this.antorchas_Array[i].encendida){
                this.antorchas_Array[i].rect.setFillStyle(0xffffff, 1);
            }
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

    accionEstatua()
    {
        //Aqui se haria la implementacion de lo que pase cuando
        //las estatuas esten en su posicion
        console.log("Has hecho el puzle");
    }
}
